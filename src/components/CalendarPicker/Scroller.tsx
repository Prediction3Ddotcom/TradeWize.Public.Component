// This is a bi-directional infinite scroller.
// As the beginning & end are reached, the dates are recalculated and the current
// index adjusted to match the previous visible date.
// RecyclerListView helps to efficiently recycle instances, but the data that
// it's fed is finite. Hence the data must be shifted at the ends to appear as
// an infinite scroller.

import { Component } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

import { addMonths } from 'date-fns/addMonths';
import { subMonths } from 'date-fns/subMonths';
import { endOfMonth } from 'date-fns/endOfMonth';
import { isAfter } from 'date-fns/isAfter';
import { isBefore } from 'date-fns/isBefore';
import { isSameMonth } from 'date-fns/isSameMonth';
import { startOfMonth } from 'date-fns/startOfMonth';

export default class CalendarScroller extends Component<any, any> {
  static propTypes = {
    data: PropTypes.array.isRequired,
    initialRenderIndex: PropTypes.number,
    renderMonth: PropTypes.func,
    renderMonthParams: PropTypes.object.isRequired,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    maxSimultaneousMonths: PropTypes.number,
    horizontal: PropTypes.bool,
    updateMonthYear: PropTypes.func,
    onMonthChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    renderMonthParams: { styles: {} },
  };
  updateLayout: (dims: any) => {
    layoutProvider: LayoutProvider;
    itemHeight: any;
    itemWidth: any;
  };
  dataProvider: DataProvider;
  updateMonthsData: (data: any) => {
    data: any;
    numMonths: any;
    dataProvider: any;
  };
  rlv: any;
  shifting: any;

  constructor(props: any) {
    super(props);

    this.updateLayout = (dims: any) => {
      const itemWidth = dims.containerWidth;
      let itemHeight = dims.containerHeight;
      if (dims.dayWrapper && dims.dayWrapper.height) {
        itemHeight = dims.dayWrapper.height * 6; // max 6 row weeks per month
      }

      const layoutProvider = new LayoutProvider(
        () => 0, // only 1 view type
        (_type, dim) => {
          dim.width = itemWidth;
          dim.height = itemHeight;
        }
      );

      return { layoutProvider, itemHeight, itemWidth };
    };

    this.dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this.updateMonthsData = (data) => {
      return {
        data,
        numMonths: data.length,
        dataProvider: this.dataProvider.cloneWithRows(data),
      };
    };

    this.state = {
      ...this.updateLayout(props.renderMonthParams.styles),
      ...this.updateMonthsData(props.data),
      numVisibleItems: 1, // updated in onLayout
    };
  }

  shouldComponentUpdate(prevProps: any, prevState: any) {
    return (
      (this.state as any).data !== (prevState as any).data ||
      (this.state as any).itemHeight !== (prevState as any).itemHeight ||
      (this.state as any).itemWidth !== (prevState as any).itemWidth ||
      (this.props as any).renderMonthParams !==
        (prevProps as any).renderMonthParams
    );
  }

  componentDidUpdate(prevProps: any) {
    let newState = {};
    let updateState = false;

    if (
      (this.props as any).renderMonthParams.styles !==
      (prevProps as any).renderMonthParams.styles
    ) {
      updateState = true;
      newState = this.updateLayout(
        (this.props as any).renderMonthParams.styles
      );
    }

    if ((this.props as any).data !== (prevProps as any).data) {
      updateState = true;
      newState = {
        ...newState,
        ...this.updateMonthsData((this.props as any).data),
      };
    }

    if (
      Platform.OS === 'android' &&
      (this.props as any).renderMonthParams.selectedStartDate !==
        prevProps.renderMonthParams.selectedStartDate
    ) {
      // Android unexpectedly jumps to previous month on first selected date.
      // Scroll RLV to selected date's month.
      this.goToDate(
        (this.props as any).renderMonthParams.selectedStartDate,
        100
      );
    }

    if (updateState) {
      this.setState(newState);
    }
  }

  goToDate = (date: any, delay: any) => {
    const data = (this.state as any).data;
    for (let i = 0; i < data.length; i++) {
      if (isSameMonth(data[i], date)) {
        if (delay) {
          setTimeout(() => this.rlv && this.rlv.scrollToIndex(i, false), delay);
        } else {
          this.rlv && this.rlv.scrollToIndex(i, false);
        }
        break;
      }
    }
  };

  // Scroll left, guarding against start index.
  scrollLeft = () => {
    const { currentIndex, numVisibleItems } = this.state as any;
    if (currentIndex === 0) {
      return;
    }
    const newIndex = Math.max(currentIndex - numVisibleItems, 0);
    this.rlv && this.rlv.scrollToIndex(newIndex, true);
  };

  // Scroll right, guarding against end index.
  scrollRight = () => {
    const { currentIndex, numVisibleItems, numMonths } = this.state as any;
    const newIndex = Math.min(currentIndex + numVisibleItems, numMonths - 1);
    this.rlv && this.rlv.scrollToIndex(newIndex, true);
  };

  // Shift dates when end of list is reached.
  shiftMonthsForward = (currentMonth: any) => {
    this.shiftMonths(currentMonth, (this.state as any).numMonths / 3);
  };

  // Shift dates when beginning of list is reached.
  shiftMonthsBackward = (currentMonth: any) => {
    this.shiftMonths(
      currentMonth,
      (((this.state as any).numMonths || 0) * 2) / 3
    );
  };

  shiftMonths = (currentMonth: any, offset: any) => {
    const prevVisMonth = new Date(currentMonth);
    const newStartMonth = subMonths(new Date(prevVisMonth), Math.floor(offset));
    this.updateMonths(prevVisMonth, newStartMonth);
  };

  updateMonths = (prevVisMonth: any, newStartMonth: any) => {
    if (this.shifting) {
      return;
    }
    const { minDate, maxDate, restrictMonthNavigation } = this.props as any;
    const data = [];
    let _newStartMonth = newStartMonth;
    if (
      minDate &&
      restrictMonthNavigation &&
      isBefore(newStartMonth, startOfMonth(minDate))
    ) {
      _newStartMonth = new Date(minDate);
    }
    for (let i = 0; i < (this.state as any).numMonths; i++) {
      let date = addMonths(_newStartMonth, i);
      if (
        maxDate &&
        restrictMonthNavigation &&
        isAfter(endOfMonth(date), maxDate)
      ) {
        break;
      }
      data.push(date);
    }
    // Prevent reducing range when the minDate - maxDate range is small.
    if (data.length < (this.props as any).maxSimultaneousMonths) {
      return;
    }

    // Scroll to previous date
    for (let i = 0; i < data.length; i++) {
      if (isSameMonth(data[i], prevVisMonth)) {
        this.shifting = true;
        this.rlv && this.rlv.scrollToIndex(i, false);
        // RecyclerListView sometimes returns position to old index after
        // moving to the new one. Set position again after delay.
        setTimeout(() => {
          this.rlv && this.rlv.scrollToIndex(i, false);
          this.shifting = false; // debounce
        }, 800);
        break;
      }
    }
    this.setState({
      data,
      dataProvider: this.dataProvider.cloneWithRows(data),
    });
  };

  // Track which dates are visible.
  onVisibleIndicesChanged = (all: any, now: any) => {
    const { data, numMonths, currentMonth: _currentMonth } = this.state as any;

    const { updateMonthYear, onMonthChange } = this.props as any;

    // "now" contains the inflight indices, whereas "all" reflects indices
    // after scrolling has settled. Prioritize "now" for faster header updates.
    const currentIndex = now[0] || all[0];
    const currentMonth = data[currentIndex]; // a date

    // Fire month/year update on month changes.  This is
    // necessary for the header and onMonthChange updates.
    if (!_currentMonth || !isSameMonth(_currentMonth, currentMonth)) {
      const currMonth = new Date(currentMonth);
      onMonthChange && onMonthChange(currMonth);
    }

    updateMonthYear && updateMonthYear(currentMonth, true);

    if (currentIndex === 0) {
      this.shiftMonthsBackward(currentMonth);
    } else if (currentIndex > numMonths - 3) {
      this.shiftMonthsForward(currentMonth);
    }
    this.setState({
      currentMonth,
      currentIndex,
    });
  };

  onLayout = (event: any) => {
    const containerWidth = event.nativeEvent.layout.width;
    this.setState({
      numVisibleItems: Math.floor(
        containerWidth / (this.state as any).itemWidth
      ),
      ...this.updateLayout((this.props as any).renderMonthParams.styles),
    });
  };

  rowRenderer = (_type: any, rowMonth: any, _i: any, extState: any) => {
    const { updateMonthYear, renderMonth } = this.props as any;
    const { currentMonth: month, currentYear: year } =
      updateMonthYear(rowMonth);
    return renderMonth && renderMonth({ ...extState, month, year });
  };

  render() {
    const {
      data,
      numMonths,
      itemHeight: height,
      itemWidth: width,
      layoutProvider,
      dataProvider,
    } = this.state as any;
    if (!data || numMonths === 0 || !height) {
      return null;
    }
    return (
      <View style={{ width, height }} onLayout={this.onLayout}>
        <RecyclerListView
          ref={(rlv: any) => (this.rlv = rlv)}
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={this.rowRenderer}
          extendedState={(this.props as any).renderMonthParams}
          initialRenderIndex={(this.props as any).initialRenderIndex}
          onVisibleIndicesChanged={this.onVisibleIndicesChanged}
          isHorizontal={(this.props as any).horizontal}
          scrollViewProps={{
            showsHorizontalScrollIndicator: false,
            snapToInterval: (this.props as any).horizontal ? width : height,
          }}
          decelerationRate={(this.props as any).scrollDecelarationRate}
        />
      </View>
    );
  }
}
