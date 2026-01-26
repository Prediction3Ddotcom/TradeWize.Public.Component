import UIKit
import React

@objc(InfinitePickerView)
class InfinitePickerView: UIView, UIPickerViewDelegate, UIPickerViewDataSource {
    
    private var pickerView: UIPickerView!
    private var items: [String] = []
    private let multiplier = 1000 // Số lần lặp
    
    // ✅ Property để bật/tắt loop
    private var isInfiniteLoop: Bool = false
    
    @objc var onValueChange: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupPicker()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupPicker()
    }
    
    private func setupPicker() {
        pickerView = UIPickerView()
        pickerView.delegate = self
        pickerView.dataSource = self
        addSubview(pickerView)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        pickerView.frame = bounds
    }
    
    @objc func setItems(_ items: [String]) {
        self.items = items
        pickerView.reloadAllComponents()
        
        // Set vị trí giữa CHỈ KHI bật infinite loop
        if !items.isEmpty && isInfiniteLoop {
            let middleRow = (items.count * multiplier) / 2
            pickerView.selectRow(middleRow, inComponent: 0, animated: false)
        }
    }
    
    // ✅ Method để set loop mode
    @objc func setInfiniteLoop(_ enabled: Bool) {
        isInfiniteLoop = enabled
        pickerView.reloadAllComponents()
        
        // Reset position khi thay đổi mode
        if !items.isEmpty {
            if enabled {
                let middleRow = (items.count * multiplier) / 2
                pickerView.selectRow(middleRow, inComponent: 0, animated: false)
            } else {
                pickerView.selectRow(0, inComponent: 0, animated: false)
            }
        }
    }
    
    // ✅ Method để set selected index
    @objc func setSelectedIndex(_ index: Int) {
        guard !items.isEmpty, index >= 0, index < items.count else { return }
        
        if isInfiniteLoop {
            // Tính toán row ở giữa với index mong muốn
            let baseRow = (items.count * multiplier) / 2
            let targetRow = baseRow + (index - (baseRow % items.count))
            pickerView.selectRow(targetRow, inComponent: 0, animated: true)
        } else {
            pickerView.selectRow(index, inComponent: 0, animated: true)
        }
    }
    
    // MARK: - UIPickerViewDataSource
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        guard !items.isEmpty else { return 0 }
        
        // ✅ Trả về số row khác nhau tùy mode
        return isInfiniteLoop ? items.count * multiplier : items.count
    }
    
    // MARK: - UIPickerViewDelegate
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        guard !items.isEmpty else { return nil }
        return items[row % items.count]
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        guard !items.isEmpty else { return }
        
        let actualIndex = row % items.count
        let value = items[actualIndex]
        
        // Gửi event về React Native
        if let onValueChange = onValueChange {
            onValueChange([
                "value": value,
                "index": actualIndex
            ])
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, rowHeightForComponent component: Int) -> CGFloat {
        return 40
    }
    
    // ✅ Optional: Custom styling
    func pickerView(_ pickerView: UIPickerView, viewForRow row: Int, forComponent component: Int, reusing view: UIView?) -> UIView {
        let label: UILabel
        if let reusedLabel = view as? UILabel {
            label = reusedLabel
        } else {
            label = UILabel()
            label.textAlignment = .center
            label.font = UIFont.systemFont(ofSize: 20)
            label.textColor = UIColor.black // Màu đen mặc định cho text
        }
        
        guard !items.isEmpty else {
            label.text = ""
            return label
        }
        
        label.text = items[row % items.count]
        
        return label
    }
}