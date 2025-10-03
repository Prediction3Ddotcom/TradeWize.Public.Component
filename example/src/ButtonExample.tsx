import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { Button } from 'tradewize-component';
import { Icon } from './Icon';

export function ButtonExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed', 'You pressed the button!');
  };

  const handleAsyncPress = async () => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Async Complete', 'Async operation completed!');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Button Component Examples</Text>

        {/* Controls */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Controls</Text>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Loading State:</Text>
            <Switch
              value={isLoading}
              onValueChange={setIsLoading}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isLoading ? '#007AFF' : '#f4f3f4'}
            />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Disabled State:</Text>
            <Switch
              value={isDisabled}
              onValueChange={setIsDisabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDisabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Variants</Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Primary"
              variant="primary"
              onPress={handlePress}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
            <Button
              title="Secondary"
              variant="secondary"
              onPress={handlePress}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
            <Button
              title="Outline"
              variant="outline"
              onPress={handlePress}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
            <Button
              title="Ghost"
              variant="ghost"
              onPress={handlePress}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
            <Button
              title="Danger"
              variant="danger"
              onPress={handlePress}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
            <Button
              title="Success"
              variant="success"
              onPress={handlePress}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
          </View>
        </View>

        {/* Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Sizes</Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Small"
              size="small"
              variant="primary"
              onPress={handlePress}
            />
            <Button
              title="Medium"
              size="medium"
              variant="primary"
              onPress={handlePress}
            />
            <Button
              title="Large"
              size="large"
              variant="primary"
              onPress={handlePress}
            />
            <Button
              title="XLarge"
              size="xlarge"
              variant="primary"
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Icons with Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons with Icons</Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Save"
              variant="success"
              leftIcon={<Icon name="save" />}
              onPress={handlePress}
            />
            <Button
              title="Download"
              variant="outline"
              rightIcon={<Icon name="download" />}
              onPress={handlePress}
            />
            <Button
              title="Share"
              variant="primary"
              leftIcon={<Icon name="share" />}
              rightIcon={<Icon name="arrow-right" />}
              onPress={handlePress}
            />
            <Button
              title="Delete"
              variant="danger"
              leftIcon={<Icon name="delete" />}
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Icon Only Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Icon Only Buttons</Text>
          <View style={styles.buttonRow}>
            <Button
              leftIcon={<Icon name="heart" />}
              iconOnly
              variant="ghost"
              size="small"
              onPress={handlePress}
            />
            <Button
              leftIcon={<Icon name="star" />}
              iconOnly
              variant="outline"
              size="medium"
              onPress={handlePress}
            />
            <Button
              leftIcon={<Icon name="plus" />}
              iconOnly
              variant="primary"
              size="large"
              onPress={handlePress}
            />
            <Button
              leftIcon={<Icon name="settings" />}
              iconOnly
              variant="secondary"
              size="xlarge"
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Full Width */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Full Width Button</Text>
          <Button
            title="Full Width Primary Button"
            variant="primary"
            fullWidth
            onPress={handlePress}
          />
        </View>

        {/* Loading State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading State</Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Loading Primary"
              variant="primary"
              isLoading={true}
              onPress={handlePress}
            />
            <Button
              title="Loading Outline"
              variant="outline"
              isLoading={true}
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Disabled State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disabled State</Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Disabled Primary"
              variant="primary"
              isDisabled={true}
              onPress={handlePress}
            />
            <Button
              title="Disabled Outline"
              variant="outline"
              isDisabled={true}
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Async Operation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Async Operation</Text>
          <Button
            title="Start Async Task"
            variant="primary"
            isLoading={isLoading}
            onPress={handleAsyncPress}
            style={styles.asyncButton}
          />
          <Text style={styles.asyncDescription}>
            This button demonstrates loading state during async operations
          </Text>
        </View>

        {/* Children Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Children Content</Text>
          <View style={styles.buttonGroup}>
            <Button
              variant="primary"
              style={styles.customButton}
              onPress={handlePress}
            >
              <View style={styles.childrenContent}>
                <Icon name="star" size={18} />
                <Text style={[styles.customText, styles.iconTextSpacing]}>
                  Custom Content
                </Text>
              </View>
            </Button>
            <Button
              variant="outline"
              style={styles.roundedButton}
              onPress={handlePress}
            >
              <View style={styles.childrenContent}>
                <Text style={styles.customText}>Multi-line</Text>
                <Text style={[styles.customText, styles.smallText]}>
                  Content
                </Text>
              </View>
            </Button>
            <Button variant="ghost" onPress={handlePress}>
              <View style={styles.childrenContent}>
                <Icon name="heart" size={16} />
                <Text style={[styles.iconTextSpacing, styles.mediumText]}>
                  ❤️ Like
                </Text>
              </View>
            </Button>
          </View>
        </View>

        {/* Custom Styling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styling</Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Custom Style"
              variant="primary"
              style={styles.customButton}
              textStyle={styles.customText}
              onPress={handlePress}
            />
            <Button
              title="Rounded Button"
              variant="outline"
              style={styles.roundedButton}
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Real-world Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-world Examples</Text>

          <View style={styles.authExample}>
            <Text style={styles.exampleTitle}>Login Form</Text>
            <Button
              title="Sign In"
              variant="primary"
              size="large"
              fullWidth
              leftIcon={<Icon name="user" />}
              onPress={() => Alert.alert('Login', 'Sign in button pressed')}
            />
            <Button
              title="Forgot Password?"
              variant="ghost"
              size="medium"
              rightIcon={<Icon name="arrow-right" />}
              onPress={() =>
                Alert.alert('Forgot Password', 'Forgot password pressed')
              }
            />
          </View>

          <View style={styles.actionsExample}>
            <Text style={styles.exampleTitle}>Action Buttons</Text>
            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                variant="secondary"
                size="medium"
                leftIcon={<Icon name="cross" />}
                onPress={() => Alert.alert('Cancel', 'Cancel pressed')}
              />
              <Button
                title="Confirm"
                variant="primary"
                size="medium"
                leftIcon={<Icon name="check" />}
                onPress={() => Alert.alert('Confirm', 'Confirm pressed')}
              />
            </View>
          </View>

          <View style={styles.socialExample}>
            <Text style={styles.exampleTitle}>Social Actions</Text>
            <View style={styles.buttonRow}>
              <Button
                title="Share"
                variant="outline"
                size="medium"
                leftIcon={<Icon name="share" />}
                onPress={() => Alert.alert('Share', 'Share button pressed')}
              />
              <Button
                leftIcon={<Icon name="like" />}
                iconOnly
                variant="ghost"
                size="medium"
                onPress={() => Alert.alert('Like', 'Like button pressed')}
              />
              <Button
                leftIcon={<Icon name="comment" />}
                iconOnly
                variant="ghost"
                size="medium"
                onPress={() => Alert.alert('Comment', 'Comment button pressed')}
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
    color: '#000000',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  buttonGroup: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  controlsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: '#000000',
  },
  asyncButton: {
    marginBottom: 8,
  },
  asyncDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  customButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
  },
  customText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  roundedButton: {
    borderRadius: 25,
  },
  authExample: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionsExample: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialExample: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  bottomSpacing: {
    height: 40,
  },
  childrenContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextSpacing: {
    marginLeft: 8,
  },
  smallText: {
    fontSize: 12,
    opacity: 0.7,
  },
  mediumText: {
    fontSize: 14,
  },
});
