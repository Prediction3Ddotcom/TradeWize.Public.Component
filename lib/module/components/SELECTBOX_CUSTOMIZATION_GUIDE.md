# SelectBox Component - Complete Customization Guide

## Overview

SelectBox component đã được nâng cấp để hỗ trợ tùy chỉnh tối đa với hơn **100+ props** bao gồm:

- ✨ Style customization cho mọi phần của component
- 🎨 Custom colors và themes
- 🔧 Render props cho flexible rendering
- 📞 Event callbacks để control behavior
- ⚙️ Advanced functions để customize logic

---

## Table of Contents

1. [Basic Props](#basic-props)
2. [Style Props](#style-props)
3. [Color Props](#color-props)
4. [Behavior Props](#behavior-props)
5. [Text Props](#text-props)
6. [Render Props](#render-props)
7. [Callback Props](#callback-props)
8. [Advanced Props](#advanced-props)
9. [Accessibility Props](#accessibility-props)
10. [Usage Examples](#usage-examples)

---

## 1. Basic Props

Props cơ bản để control chức năng của SelectBox.

```typescript
interface BasicProps {
  label?: string; // Label hiển thị phía trên
  placeholder?: string; // Text hiển thị khi chưa chọn
  helperText?: string; // Text hướng dẫn phía dưới
  errorText?: string; // Text lỗi (override helperText)
  options: SelectOption[]; // Danh sách options
  value?: string | number | Array<string | number>; // Giá trị được chọn
  onChange?: (value: string | number | Array<string | number>) => void;
  multiple?: boolean; // Cho phép chọn nhiều
  searchable?: boolean; // Hiển thị search input
  leftIcon?: ReactNode; // Icon bên trái
  rightIcon?: ReactNode; // Icon bên phải
  variant?: 'outline' | 'filled' | 'underline'; // Kiểu hiển thị
  size?: 'small' | 'medium' | 'large'; // Kích thước
  isDisabled?: boolean; // Disable component
  isError?: boolean; // Hiển thị trạng thái lỗi
  isRequired?: boolean; // Hiển thị dấu * (required)
  fullWidth?: boolean; // Chiếm full width
}
```

**Example:**

```tsx
<SelectBox
  label="Chọn quốc gia"
  placeholder="Vui lòng chọn..."
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  variant="outline"
  size="medium"
  isRequired
/>
```

---

## 2. Style Props

### 2.1 Main Container Styles

```typescript
interface MainContainerStyles {
  containerStyle?: ViewStyle; // Container ngoài cùng
  inputStyle?: TextStyle; // Text style của input
  labelStyle?: TextStyle; // Style của label
  inputContainerStyle?: ViewStyle; // Container của input field
  helperTextStyle?: TextStyle; // Style của helper text
  errorTextStyle?: TextStyle; // Style của error text
}
```

### 2.2 Modal Styles

```typescript
interface ModalStyles {
  modalStyle?: ViewStyle; // Modal wrapper
  modalOverlayStyle?: ViewStyle; // Modal overlay (backdrop)
  modalContentStyle?: ViewStyle; // Modal content container
  modalHeaderStyle?: ViewStyle; // Modal header container
  modalFooterStyle?: ViewStyle; // Modal footer container
  modalTitleStyle?: TextStyle; // Modal title text
}
```

### 2.3 Search Styles

```typescript
interface SearchStyles {
  searchContainerStyle?: ViewStyle; // Search container
  searchInputStyle?: TextStyle; // Search input text
}
```

### 2.4 Option Styles

```typescript
interface OptionStyles {
  optionStyle?: ViewStyle; // Option item container
  optionLabelStyle?: TextStyle; // Option label text
  optionDescriptionStyle?: TextStyle; // Option description text
  selectedOptionStyle?: ViewStyle; // Style khi option được chọn
  disabledOptionStyle?: ViewStyle; // Style khi option bị disabled
  checkboxStyle?: ViewStyle; // Checkbox container (multiple mode)
  checkmarkStyle?: TextStyle; // Checkmark style
}
```

### 2.5 Icon & Button Styles

```typescript
interface IconButtonStyles {
  leftIconContainerStyle?: ViewStyle; // Left icon container
  rightIconContainerStyle?: ViewStyle; // Right icon container
  chevronIconStyle?: TextStyle; // Chevron dropdown icon
  clearButtonStyle?: ViewStyle; // Clear button container
  clearButtonTextStyle?: TextStyle; // Clear button text
  closeButtonStyle?: ViewStyle; // Modal close button
  closeButtonTextStyle?: TextStyle; // Modal close button text
}
```

**Example:**

```tsx
<SelectBox
  options={options}
  containerStyle={{ marginBottom: 20 }}
  inputContainerStyle={{
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  }}
  labelStyle={{
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  }}
  modalContentStyle={{
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 20,
  }}
  optionStyle={{
    paddingVertical: 16,
    borderRadius: 8,
  }}
  optionLabelStyle={{
    fontSize: 15,
    fontWeight: '500',
  }}
/>
```

---

## 3. Color Props

Customize tất cả màu sắc của component.

```typescript
interface ColorProps {
  borderColorActive?: string; // Màu border khi focus
  borderColorError?: string; // Màu border khi error
  borderColor?: string; // Màu border mặc định
  backgroundColor?: string; // Background color của input
  textColor?: string; // Màu text
  placeholderColor?: string; // Màu placeholder
  modalBackgroundColor?: string; // Background modal
  selectedBackgroundColor?: string; // Background khi selected
  checkboxSelectedColor?: string; // Màu checkbox khi selected
  checkboxUnselectedColor?: string; // Màu checkbox khi unselected
}
```

**Example - Custom Theme:**

```tsx
// Dark Theme
<SelectBox
  options={options}
  borderColorActive="#BB86FC"
  borderColor="#3A3A3C"
  backgroundColor="#1C1C1E"
  textColor="#FFFFFF"
  placeholderColor="#8E8E93"
  modalBackgroundColor="#2C2C2E"
  selectedBackgroundColor="#3A3A3C"
  checkboxSelectedColor="#BB86FC"
/>

// Brand Theme
<SelectBox
  options={options}
  borderColorActive="#00A67E"
  borderColor="#E0E0E0"
  backgroundColor="#FFFFFF"
  textColor="#1A1A1A"
  placeholderColor="#999999"
  modalBackgroundColor="#FFFFFF"
  selectedBackgroundColor="#E8F5F1"
  checkboxSelectedColor="#00A67E"
/>
```

---

## 4. Behavior Props

Control hành vi của component.

```typescript
interface BehaviorProps {
  maxHeight?: number; // Max height của modal (default: 60% screen)
  emptyMessage?: string; // Message khi không có data
  searchPlaceholder?: string; // Placeholder của search
  closeOnSelect?: boolean; // Đóng modal sau khi chọn (default: true)
  modalPosition?: 'center' | 'bottom'; // Vị trí modal (default: 'center')
  animationInTiming?: number; // Thời gian animation in (default: 300)
  animationOutTiming?: number; // Thời gian animation out (default: 300)
  backdropOpacity?: number; // Độ mờ của backdrop (default: 0.5)
  showClearButton?: boolean; // Hiển thị nút clear (default: true)
  showCheckmark?: boolean; // Hiển thị checkmark (default: true)
}
```

**Example:**

```tsx
<SelectBox
  options={options}
  modalPosition="bottom"
  animationInTiming={400}
  animationOutTiming={300}
  backdropOpacity={0.7}
  maxHeight={500}
  closeOnSelect={false}
  showClearButton={true}
  emptyMessage="Không tìm thấy kết quả"
  searchPlaceholder="Tìm kiếm..."
/>
```

---

## 5. Text Props

Customize text hiển thị.

```typescript
interface TextProps {
  modalTitle?: string; // Title của modal (override label)
  confirmButtonText?: string; // Text nút confirm (default: 'Xong')
  cancelButtonText?: string; // Text nút cancel (default: 'Xóa')

  // Button styles
  confirmButtonStyle?: ViewStyle;
  confirmButtonTextStyle?: TextStyle;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;
}
```

**Example:**

```tsx
<SelectBox
  options={options}
  multiple
  modalTitle="Chọn các sản phẩm"
  confirmButtonText="Hoàn tất"
  cancelButtonText="Xóa tất cả"
  confirmButtonStyle={{
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
  }}
  confirmButtonTextStyle={{
    fontWeight: '700',
  }}
/>
```

---

## 6. Render Props

Tùy chỉnh rendering của từng phần component.

```typescript
interface RenderProps {
  // Render option item
  renderOption?: (option: SelectOption, isSelected: boolean) => ReactNode;

  // Render label
  renderLabel?: (label: string, isRequired: boolean) => ReactNode;

  // Render display text (selected values)
  renderDisplayText?: (
    displayText: string,
    selectedOptions: SelectOption[]
  ) => ReactNode;

  // Render modal header
  renderModalHeader?: (title: string, onClose: () => void) => ReactNode;

  // Render modal footer
  renderModalFooter?: (
    onConfirm: () => void,
    onClear: () => void,
    selectedCount: number
  ) => ReactNode;

  // Render empty state
  renderEmptyState?: (emptyMessage: string) => ReactNode;

  // Render search input
  renderSearchInput?: (
    searchQuery: string,
    onChangeText: (text: string) => void
  ) => ReactNode;

  // Render icons
  renderLeftIcon?: (size: number, color: string) => ReactNode;
  renderRightIcon?: (size: number, color: string) => ReactNode;
  renderChevron?: (isOpen: boolean) => ReactNode;
  renderClearButton?: (onClear: () => void) => ReactNode;
}
```

**Example - Custom Option Rendering:**

```tsx
<SelectBox
  options={products}
  renderOption={(option, isSelected) => (
    <View style={styles.customOption}>
      <Image source={{ uri: option.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{option.label}</Text>
        <Text style={styles.productPrice}>${option.price}</Text>
      </View>
      {isSelected && <Icon name="check-circle" size={24} color="#00A67E" />}
    </View>
  )}
/>
```

**Example - Custom Display Text:**

```tsx
<SelectBox
  options={options}
  multiple
  renderDisplayText={(displayText, selectedOptions) => (
    <View style={styles.chipContainer}>
      {selectedOptions.map((opt) => (
        <View key={opt.value} style={styles.chip}>
          <Text style={styles.chipText}>{opt.label}</Text>
        </View>
      ))}
    </View>
  )}
/>
```

**Example - Custom Modal Header:**

```tsx
<SelectBox
  options={options}
  renderModalHeader={(title, onClose) => (
    <View style={styles.customHeader}>
      <Icon name="filter" size={24} />
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onClose}>
        <Icon name="close" size={24} />
      </TouchableOpacity>
    </View>
  )}
/>
```

**Example - Custom Empty State:**

```tsx
<SelectBox
  options={options}
  renderEmptyState={(message) => (
    <View style={styles.emptyState}>
      <Icon name="inbox" size={64} color="#ccc" />
      <Text style={styles.emptyMessage}>{message}</Text>
      <Button title="Tải lại" onPress={handleReload} />
    </View>
  )}
/>
```

---

## 7. Callback Props

Listen và handle events.

```typescript
interface CallbackProps {
  onOpen?: () => void; // Khi modal mở
  onClose?: () => void; // Khi modal đóng
  onSearch?: (query: string) => void; // Khi search text thay đổi
  onClear?: () => void; // Khi clear selection
  onSelectOption?: (option: SelectOption) => void; // Khi chọn option
  onDeselectOption?: (option: SelectOption) => void; // Khi bỏ chọn option
  onFocus?: () => void; // Khi focus
  onBlur?: () => void; // Khi blur
}
```

**Example - Analytics Tracking:**

```tsx
<SelectBox
  options={options}
  onOpen={() => {
    analytics.track('SelectBox_Opened', {
      component: 'CountrySelector',
    });
  }}
  onSelectOption={(option) => {
    analytics.track('Option_Selected', {
      label: option.label,
      value: option.value,
    });
  }}
  onSearch={(query) => {
    analytics.track('SelectBox_Search', {
      query,
    });
  }}
/>
```

**Example - API Integration:**

```tsx
<SelectBox
  options={options}
  onSearch={(query) => {
    // Debounced API call
    debouncedSearch(query);
  }}
  onOpen={() => {
    // Reload data when opening
    fetchLatestOptions();
  }}
/>
```

---

## 8. Advanced Props

Custom logic và behavior nâng cao.

```typescript
interface AdvancedProps {
  // Custom filter logic
  filterOptions?: (
    options: SelectOption[],
    searchQuery: string
  ) => SelectOption[];

  // Custom sort logic
  sortOptions?: (options: SelectOption[]) => SelectOption[];

  // Custom label getter
  getOptionLabel?: (option: SelectOption) => string;

  // Custom value getter
  getOptionValue?: (option: SelectOption) => string | number;

  // Custom disabled check
  isOptionDisabled?: (option: SelectOption) => boolean;

  // Custom selected check
  isOptionSelected?: (
    option: SelectOption,
    value?: string | number | Array<string | number>
  ) => boolean;
}
```

**Example - Custom Filter (Fuzzy Search):**

```tsx
import Fuse from 'fuse.js';

<SelectBox
  options={options}
  filterOptions={(options, query) => {
    if (!query) return options;

    const fuse = new Fuse(options, {
      keys: ['label', 'description', 'tags'],
      threshold: 0.3,
    });

    return fuse.search(query).map((result) => result.item);
  }}
/>;
```

**Example - Custom Sort:**

```tsx
<SelectBox
  options={options}
  sortOptions={(options) => {
    // Sort by popularity then alphabetically
    return [...options].sort((a, b) => {
      if (a.popularity !== b.popularity) {
        return b.popularity - a.popularity;
      }
      return a.label.localeCompare(b.label);
    });
  }}
/>
```

**Example - Custom Disabled Logic:**

```tsx
<SelectBox
  options={products}
  isOptionDisabled={(option) => {
    // Disable if out of stock or price too high
    return option.stock === 0 || option.price > userBudget;
  }}
/>
```

**Example - Custom Selected Check:**

```tsx
<SelectBox
  options={users}
  getOptionValue={(option) => option.id}
  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
  isOptionSelected={(option, value) => {
    return Array.isArray(value)
      ? value.includes(option.id)
      : value === option.id;
  }}
/>
```

---

## 9. Accessibility Props

Improve accessibility và testing.

```typescript
interface AccessibilityProps {
  accessibilityLabel?: string; // Accessibility label
  accessibilityHint?: string; // Accessibility hint
  testID?: string; // Test ID cho main component
  modalTestID?: string; // Test ID cho modal
  optionTestID?: string; // Test ID cho options
}
```

**Example:**

```tsx
<SelectBox
  options={options}
  accessibilityLabel="Chọn quốc gia"
  accessibilityHint="Mở danh sách để chọn quốc gia của bạn"
  testID="country-selector"
  modalTestID="country-selector-modal"
  optionTestID="country-option"
/>
```

---

## 10. Usage Examples

### Example 1: Simple Select

```tsx
import { SelectBox } from '@/components';

function SimpleSelect() {
  const [country, setCountry] = useState('');

  const countries = [
    { label: 'Việt Nam', value: 'vn' },
    { label: 'United States', value: 'us' },
    { label: 'Japan', value: 'jp' },
  ];

  return (
    <SelectBox
      label="Quốc gia"
      placeholder="Chọn quốc gia"
      options={countries}
      value={country}
      onChange={setCountry}
    />
  );
}
```

### Example 2: Multi-Select with Custom Styling

```tsx
function MultiSelect() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <SelectBox
      label="Tags"
      placeholder="Chọn tags"
      options={tagOptions}
      value={tags}
      onChange={setTags}
      multiple
      // Custom styling
      borderColorActive="#8B5CF6"
      checkboxSelectedColor="#8B5CF6"
      selectedBackgroundColor="#F3E8FF"
      inputContainerStyle={{
        borderRadius: 16,
        borderWidth: 2,
      }}
      modalContentStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    />
  );
}
```

### Example 3: Searchable with Icons

```tsx
import { Icon } from 'react-native-elements';

function SearchableSelect() {
  const [city, setCity] = useState('');

  return (
    <SelectBox
      label="Thành phố"
      placeholder="Tìm thành phố"
      options={cities}
      value={city}
      onChange={setCity}
      searchable
      searchPlaceholder="Tìm kiếm thành phố..."
      leftIcon={<Icon name="location-on" type="material" />}
      renderOption={(option, isSelected) => (
        <View style={styles.cityOption}>
          <Icon
            name="location-city"
            type="material"
            size={24}
            color={isSelected ? '#007AFF' : '#666'}
          />
          <Text style={styles.cityName}>{option.label}</Text>
          <Text style={styles.cityCode}>{option.code}</Text>
        </View>
      )}
    />
  );
}
```

### Example 4: Bottom Sheet Modal

```tsx
function BottomSheetSelect() {
  const [product, setProduct] = useState('');

  return (
    <SelectBox
      label="Sản phẩm"
      options={products}
      value={product}
      onChange={setProduct}
      // Bottom sheet config
      modalPosition="bottom"
      maxHeight={600}
      animationInTiming={400}
      backdropOpacity={0.7}
      modalContentStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 24,
      }}
    />
  );
}
```

### Example 5: Advanced Filtering & Sorting

```tsx
import { matchSorter } from 'match-sorter';

function AdvancedSelect() {
  const [user, setUser] = useState('');

  return (
    <SelectBox
      label="Người dùng"
      options={users}
      value={user}
      onChange={setUser}
      // Custom filtering using match-sorter
      filterOptions={(options, query) => {
        if (!query) return options;
        return matchSorter(options, query, {
          keys: ['label', 'email', 'department'],
        });
      }}
      // Sort by role then name
      sortOptions={(options) => {
        return [...options].sort((a, b) => {
          if (a.role !== b.role) {
            const roleOrder = { admin: 0, manager: 1, user: 2 };
            return roleOrder[a.role] - roleOrder[b.role];
          }
          return a.label.localeCompare(b.label);
        });
      }}
      // Custom label with role
      getOptionLabel={(option) =>
        `${option.firstName} ${option.lastName} (${option.role})`
      }
    />
  );
}
```

### Example 6: Complete Custom Theme

```tsx
const customTheme = {
  // Colors
  borderColorActive: '#FF6B6B',
  borderColor: '#E0E0E0',
  backgroundColor: '#FFFFFF',
  textColor: '#2D3436',
  placeholderColor: '#B2BEC3',
  modalBackgroundColor: '#FFFFFF',
  selectedBackgroundColor: '#FFE5E5',
  checkboxSelectedColor: '#FF6B6B',

  // Styles
  inputContainerStyle: {
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 16,
  },

  labelStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },

  modalContentStyle: {
    borderRadius: 20,
    padding: 0,
  },

  optionStyle: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  optionLabelStyle: {
    fontSize: 15,
    fontWeight: '500',
  },
};

function ThemedSelect() {
  return <SelectBox label="Theme Demo" options={options} {...customTheme} />;
}
```

### Example 7: With Analytics & Logging

```tsx
function AnalyticsSelect() {
  const [category, setCategory] = useState('');

  return (
    <SelectBox
      label="Danh mục"
      options={categories}
      value={category}
      onChange={(value) => {
        setCategory(value);
        analytics.track('Category_Changed', { value });
      }}
      onOpen={() => {
        analytics.track('CategorySelector_Opened');
        console.log('[SelectBox] Modal opened');
      }}
      onClose={() => {
        analytics.track('CategorySelector_Closed');
        console.log('[SelectBox] Modal closed');
      }}
      onSearch={(query) => {
        analytics.track('CategorySelector_Search', { query });
        console.log('[SelectBox] Search:', query);
      }}
      onSelectOption={(option) => {
        analytics.track('Category_Selected', {
          label: option.label,
          value: option.value,
        });
        console.log('[SelectBox] Selected:', option);
      }}
    />
  );
}
```

---

## Best Practices

### 1. Performance Optimization

```tsx
// ✅ Memoize options
const options = useMemo(
  () => data.map((item) => ({ label: item.name, value: item.id })),
  [data]
);

// ✅ Memoize callbacks
const handleChange = useCallback((value) => {
  setState(value);
}, []);

<SelectBox options={options} onChange={handleChange} />;
```

### 2. Type Safety

```typescript
// Define custom option type
interface ProductOption extends SelectOption {
  price: number;
  stock: number;
  image: string;
}

const products: ProductOption[] = [
  { label: 'Product 1', value: 1, price: 100, stock: 10, image: '...' }
];

<SelectBox<ProductOption>
  options={products}
  renderOption={(option) => (
    // TypeScript knows about price, stock, image
    <ProductCard product={option} />
  )}
/>
```

### 3. Error Handling

```tsx
<SelectBox
  options={options}
  value={value}
  onChange={setValue}
  // Validation
  isError={!value && submitted}
  errorText={!value && submitted ? 'Vui lòng chọn' : undefined}
  // Empty state
  emptyMessage="Không có dữ liệu. Vui lòng thử lại."
  renderEmptyState={(message) => (
    <EmptyStateWithRetry message={message} onRetry={fetchData} />
  )}
/>
```

### 4. Accessibility

```tsx
<SelectBox
  options={options}
  // Clear labels
  label="Quốc gia"
  placeholder="Chọn quốc gia của bạn"
  // Accessibility
  accessibilityLabel="Bộ chọn quốc gia"
  accessibilityHint="Nhấn để mở danh sách quốc gia"
  // Testing
  testID="country-selector"
  modalTestID="country-modal"
  optionTestID="country-option"
/>
```

---

## Migration Guide

Nếu bạn đang sử dụng version cũ của SelectBox, đây là cách migrate:

### Before (Old Version)

```tsx
<SelectBox
  label="Country"
  options={countries}
  value={country}
  onChange={setCountry}
/>
```

### After (New Version - Fully Compatible)

```tsx
// Vẫn hoạt động như cũ! 100% backward compatible
<SelectBox
  label="Country"
  options={countries}
  value={country}
  onChange={setCountry}
/>

// Hoặc thêm customization
<SelectBox
  label="Country"
  options={countries}
  value={country}
  onChange={setCountry}

  // New features
  borderColorActive="#00A67E"
  modalPosition="bottom"
  onSelectOption={(option) => console.log(option)}
/>
```

---

## Tips & Tricks

### 1. Dynamic Placeholder

```tsx
<SelectBox
  options={options}
  placeholder={
    loading
      ? 'Đang tải...'
      : options.length === 0
        ? 'Không có dữ liệu'
        : 'Chọn một tùy chọn'
  }
/>
```

### 2. Conditional Rendering

```tsx
<SelectBox
  options={options}
  renderOption={(option, isSelected) => {
    if (option.featured) {
      return <FeaturedOption option={option} isSelected={isSelected} />;
    }
    return <RegularOption option={option} isSelected={isSelected} />;
  }}
/>
```

### 3. Loading State

```tsx
<SelectBox
  options={loading ? [] : options}
  isDisabled={loading}
  placeholder={loading ? 'Đang tải...' : 'Chọn...'}
  emptyMessage={loading ? 'Đang tải...' : 'Không có dữ liệu'}
/>
```

---

## Support & Feedback

Nếu bạn có câu hỏi, gặp vấn đề, hoặc có ý tưởng để cải thiện component:

- 📖 Đọc documentation
- 🐛 Report bugs via GitHub Issues
- 💡 Request features via GitHub Discussions
- 📧 Contact: support@tradewize.com

---

**Version:** 2.0.0  
**Last Updated:** October 17, 2025  
**License:** MIT
