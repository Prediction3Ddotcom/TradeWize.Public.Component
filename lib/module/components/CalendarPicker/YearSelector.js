"use strict";

// Parent view for Year selector — paginated (12 years per page)

import React, { useCallback, useRef, useMemo } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import YearsGridView from "./YearsGridView.js";
import YearsHeader from "./YearsHeader.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const YEARS_PER_PAGE = 12;
const TOTAL_PAGES = 20; // 10 pages before current, 10 after → covers 240 years
const HALF_PAGES = Math.floor(TOTAL_PAGES / 2);
export default function YearSelector(props) {
  const {
    styles,
    textStyle,
    currentMonth,
    currentYear,
    minDate,
    maxDate,
    restrictNavigation,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    onSelectYear,
    headingLevel,
    selectedYearStyle,
    selectedYearTextStyle
  } = props;
  const flatListRef = useRef(null);
  const currentPageIndex = useRef(HALF_PAGES);

  // Compute page width from styles or screen
  const pageWidth = styles.containerWidth || Dimensions.get('window').width;

  // Build the list of pages. Each page is defined by its starting year.
  // The "center" page contains the currentYear.
  const pages = useMemo(() => {
    // The center page's start year is aligned to a multiple of YEARS_PER_PAGE
    const centerStart = Math.floor(currentYear / YEARS_PER_PAGE) * YEARS_PER_PAGE;
    return Array.from({
      length: TOTAL_PAGES
    }, (_, i) => {
      const offset = i - HALF_PAGES;
      return centerStart + offset * YEARS_PER_PAGE;
    });
  }, [currentYear]);

  // Derive the visible page info for header
  const [visiblePageIdx, setVisiblePageIdx] = React.useState(HALF_PAGES);
  const visibleStartYear = pages[visiblePageIdx] ?? pages[HALF_PAGES];
  const visibleEndYear = visibleStartYear + YEARS_PER_PAGE - 1;
  const onViewableItemsChanged = useRef(({
    viewableItems
  }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index;
      if (typeof idx === 'number') {
        setVisiblePageIdx(idx);
        currentPageIndex.current = idx;
      }
    }
  }).current;
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current;
  const handlePrevious = useCallback(() => {
    const nextIdx = Math.max(currentPageIndex.current - 1, 0);
    flatListRef.current?.scrollToIndex({
      index: nextIdx,
      animated: true
    });
  }, []);
  const handleNext = useCallback(() => {
    const nextIdx = Math.min(currentPageIndex.current + 1, TOTAL_PAGES - 1);
    flatListRef.current?.scrollToIndex({
      index: nextIdx,
      animated: true
    });
  }, []);
  const getItemLayout = useCallback((_data, index) => ({
    length: pageWidth,
    offset: pageWidth * index,
    index
  }), [pageWidth]);
  const renderPage = useCallback(({
    item: startYear
  }) => /*#__PURE__*/_jsx(View, {
    style: {
      width: pageWidth
    },
    children: /*#__PURE__*/_jsx(YearsGridView, {
      startYear: startYear,
      yearsPerPage: YEARS_PER_PAGE,
      currentMonth: currentMonth,
      currentYear: currentYear,
      styles: styles,
      onSelectYear: onSelectYear,
      minDate: minDate,
      maxDate: maxDate,
      textStyle: textStyle,
      selectedYearStyle: selectedYearStyle,
      selectedYearTextStyle: selectedYearTextStyle
    })
  }), [pageWidth, currentMonth, currentYear, styles, onSelectYear, minDate, maxDate, textStyle, selectedYearStyle, selectedYearTextStyle]);
  const keyExtractor = useCallback(item => `year-page-${item}`, []);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.calendar,
    children: [/*#__PURE__*/_jsx(YearsHeader, {
      styles: styles,
      textStyle: textStyle,
      headingLevel: headingLevel,
      startYear: visibleStartYear,
      endYear: visibleEndYear,
      minDate: minDate,
      maxDate: maxDate,
      restrictNavigation: restrictNavigation,
      previousComponent: previousComponent,
      nextComponent: nextComponent,
      previousTitle: previousTitle,
      nextTitle: nextTitle,
      previousTitleStyle: previousTitleStyle,
      nextTitleStyle: nextTitleStyle,
      onYearViewPrevious: handlePrevious,
      onYearViewNext: handleNext
    }), /*#__PURE__*/_jsx(FlatList, {
      ref: flatListRef,
      data: pages,
      horizontal: true,
      pagingEnabled: true,
      showsHorizontalScrollIndicator: false,
      initialScrollIndex: HALF_PAGES,
      getItemLayout: getItemLayout,
      renderItem: renderPage,
      keyExtractor: keyExtractor,
      onViewableItemsChanged: onViewableItemsChanged,
      viewabilityConfig: viewabilityConfig
    })]
  });
}
//# sourceMappingURL=YearSelector.js.map