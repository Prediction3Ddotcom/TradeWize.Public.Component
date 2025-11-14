import Foundation
import React

@objc(InfinitePickerViewManager)
class InfinitePickerViewManager: RCTViewManager {
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func view() -> UIView! {
        return InfinitePickerView()
    }
}