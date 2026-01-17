import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WheelDatePicker, Text, Button } from 'tradewize-component';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WheelDatePickerExample() {
    const [isVisible1, setIsVisible1] = useState<boolean>(false);
    const [isVisible2, setIsVisible2] = useState<boolean>(false);
    const [isVisible3, setIsVisible3] = useState<boolean>(false);
    const [isVisible4, setIsVisible4] = useState<boolean>(false);
    const [isVisible5, setIsVisible5] = useState<boolean>(false);
    const [isVisible6, setIsVisible6] = useState<boolean>(false);

    const [selectedDate1, setSelectedDate1] = useState<string>('');
    const [selectedDate2, setSelectedDate2] = useState<string>('');
    const [selectedDate3, setSelectedDate3] = useState<string>('');
    const [selectedDate4, setSelectedDate4] = useState<string>('');
    const [selectedDate5, setSelectedDate5] = useState<string>('');
    const [selectedDate6, setSelectedDate6] = useState<string>('');

    const initialDate = new Date();
    const minDate = new Date(2020, 0, 1); // 01/01/2020
    const maxDate = new Date(2030, 11, 31); // 31/12/2030

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text variant="h4" style={styles.title}>
                    WheelDatePicker Component
                </Text>
                <Text variant="body" color="secondary" style={styles.subtitle}>
                    Component chọn ngày tháng năm với wheel picker (iOS spinner / Android date picker)
                </Text>

                {/* Basic WheelDatePicker */}
                <View style={styles.section}>
                    <Text variant="h6" style={styles.sectionTitle}>
                        Basic WheelDatePicker
                    </Text>
                    <Button
                        title="Mở WheelDatePicker"
                        onPress={() => setIsVisible1(true)}
                    />
                    {selectedDate1 && (
                        <Text variant="caption" color="secondary" style={styles.result}>
                            Giá trị đã chọn: {selectedDate1}
                        </Text>
                    )}
                    <WheelDatePicker
                        initialDate={initialDate}
                        isVisible={isVisible1}
                        title="Chọn ngày"
                        confirmButtonText="Xác nhận"
                        cancelButtonText="Hủy"
                        confirmButtonOnPress={(date: string) => {
                            setSelectedDate1(date);
                            setIsVisible1(false);
                        }}
                        cancelButtonOnPress={() => {
                            setIsVisible1(false);
                        }}
                    />
                </View>

                {/* WheelDatePicker with Helper Text */}
                <View style={styles.section}>
                    <Text variant="h6" style={styles.sectionTitle}>
                        WheelDatePicker với Helper Text
                    </Text>
                    <Button
                        title="Mở với Helper Text"
                        onPress={() => setIsVisible2(true)}
                    />
                    {selectedDate2 && (
                        <Text variant="caption" color="secondary" style={styles.result}>
                            Giá trị đã chọn: {selectedDate2}
                        </Text>
                    )}
                    <WheelDatePicker
                        initialDate={initialDate}
                        isVisible={isVisible2}
                        title="Chọn ngày sinh"
                        helperText="Vui lòng chọn ngày tháng năm sinh của bạn"
                        confirmButtonText="Chọn"
                        cancelButtonText="Đóng"
                        confirmButtonOnPress={(date: string) => {
                            setSelectedDate2(date);
                            setIsVisible2(false);
                        }}
                        cancelButtonOnPress={() => {
                            setIsVisible2(false);
                        }}
                    />
                </View>

                {/* WheelDatePicker with Min/Max Date */}
                <View style={styles.section}>
                    <Text variant="h6" style={styles.sectionTitle}>
                        WheelDatePicker với giới hạn ngày
                    </Text>
                    <Button
                        title="Mở với Min/Max Date"
                        onPress={() => setIsVisible3(true)}
                    />
                    {selectedDate3 && (
                        <Text variant="caption" color="secondary" style={styles.result}>
                            Giá trị đã chọn: {selectedDate3}
                        </Text>
                    )}
                    <WheelDatePicker
                        initialDate={initialDate}
                        isVisible={isVisible3}
                        title="Chọn ngày trong khoảng"
                        helperText="Chỉ được chọn từ 01/01/2020 đến 31/12/2030"
                        minDate={minDate}
                        maxDate={maxDate}
                        confirmButtonText="Xác nhận"
                        cancelButtonText="Hủy"
                        confirmButtonOnPress={(date: string) => {
                            setSelectedDate3(date);
                            setIsVisible3(false);
                        }}
                        cancelButtonOnPress={() => {
                            setIsVisible3(false);
                        }}
                    />
                </View>

                {/* WheelDatePicker with Custom Styling */}
                <View style={styles.section}>
                    <Text variant="h6" style={styles.sectionTitle}>
                        WheelDatePicker với Custom Styling
                    </Text>
                    <Button
                        title="Mở với Custom Style"
                        onPress={() => setIsVisible4(true)}
                    />
                    {selectedDate4 && (
                        <Text variant="caption" color="secondary" style={styles.result}>
                            Giá trị đã chọn: {selectedDate4}
                        </Text>
                    )}
                    <WheelDatePicker
                        initialDate={initialDate}
                        isVisible={isVisible4}
                        title="Chọn ngày đặc biệt"
                        helperText="Custom styling cho các button và text"
                        titleStyle={styles.customTitle}
                        helperTextStyle={styles.customHelperText}
                        confirmButtonText="Đồng ý"
                        confirmButtonTextStyle={styles.customConfirmText}
                        confirmButtonStyle={styles.customConfirmButton}
                        cancelButtonText="Không"
                        cancelButtonTextStyle={styles.customCancelText}
                        cancelButtonStyle={styles.customCancelButton}
                        confirmButtonOnPress={(date: string) => {
                            setSelectedDate4(date);
                            setIsVisible4(false);
                        }}
                        cancelButtonOnPress={() => {
                            setIsVisible4(false);
                        }}
                    />
                </View>

                {/* WheelDatePicker with Custom Header */}
                <View style={styles.section}>
                    <Text variant="h6" style={styles.sectionTitle}>
                        WheelDatePicker với Custom Header
                    </Text>
                    <Button
                        title="Mở với Custom Header"
                        onPress={() => setIsVisible5(true)}
                    />
                    {selectedDate5 && (
                        <Text variant="caption" color="secondary" style={styles.result}>
                            Giá trị đã chọn: {selectedDate5}
                        </Text>
                    )}
                    <WheelDatePicker
                        initialDate={initialDate}
                        isVisible={isVisible5}
                        customHeader={
                            <View style={styles.customHeader}>
                                <Text variant="h4" style={styles.customHeaderText}>
                                    🎉 Chọn Ngày Sinh Nhật
                                </Text>
                                <Text variant="caption" color="secondary">
                                    Chọn ngày đặc biệt của bạn
                                </Text>
                            </View>
                        }
                        helperText="Custom header với emoji và mô tả"
                        confirmButtonText="Xác nhận"
                        cancelButtonText="Hủy"
                        confirmButtonOnPress={(date: string) => {
                            setSelectedDate5(date);
                            setIsVisible5(false);
                        }}
                        cancelButtonOnPress={() => {
                            setIsVisible5(false);
                        }}
                    />
                </View>

                {/* WheelDatePicker with Custom Footer */}
                <View style={styles.section}>
                    <Text variant="h6" style={styles.sectionTitle}>
                        WheelDatePicker với Custom Footer
                    </Text>
                    <Button
                        title="Mở với Custom Footer"
                        onPress={() => setIsVisible6(true)}
                    />
                    {selectedDate6 && (
                        <Text variant="caption" color="secondary" style={styles.result}>
                            Giá trị đã chọn: {selectedDate6}
                        </Text>
                    )}
                    <WheelDatePicker
                        initialDate={initialDate}
                        isVisible={isVisible6}
                        title="Chọn ngày hẹn"
                        customFooter={
                            <View style={styles.customFooter}>
                                <Text variant="body" style={styles.customFooterText}>
                                    ⚠️ Lưu ý: Ngày đã chọn sẽ không thể thay đổi sau khi xác nhận
                                </Text>
                            </View>
                        }
                        confirmButtonText="Xác nhận"
                        cancelButtonText="Hủy"
                        confirmButtonOnPress={(date: string) => {
                            setSelectedDate6(date);
                            setIsVisible6(false);
                        }}
                        cancelButtonOnPress={() => {
                            setIsVisible6(false);
                        }}
                    />
                </View>

                <View style={styles.bottomSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContent: {
        padding: 16,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    result: {
        marginTop: 8,
        fontStyle: 'italic',
    },
    bottomSpace: {
        height: 40,
    },
    customTitle: {
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
    customHelperText: {
        color: '#4ECDC4',
        fontSize: 14,
    },
    customConfirmText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    customConfirmButton: {
        backgroundColor: '#FF6B6B',
    },
    customCancelText: {
        color: '#FF6B6B',
    },
    customCancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF6B6B',
    },
    customHeader: {
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    customHeaderText: {
        marginBottom: 4,
    },
    customFooter: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    customFooterText: {
        color: '#FF9800',
        textAlign: 'center',
    },
});

