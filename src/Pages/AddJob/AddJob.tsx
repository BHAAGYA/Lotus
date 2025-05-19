import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';
import { POSTNETWORK } from '../../utils/Network';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProfileContext } from '../ProfileContext/ProfileContext';
import { CheckBox } from '@rneui/themed';

// Light Mode Theme Colors


const CustomTable = ({ onDataChange, theme }) => {
  const USERS_LIST = ['xyz@example.com', 'abc@example.com', 'bhagya@example.com', 'ram@example.com'];
  
  const tableHead = ['Phases', 'Aprox days', 'Users'];
  const tableData = [
    ['1', '23', ''],
    ['2', '30', ''],
    ['3', '25', ''],
  ];

  const [checkedRows, setCheckedRows] = useState(new Array(tableData.length).fill(false));
  const [selectedUsers, setSelectedUsers] = useState(new Array(tableData.length).fill([]));
  const [modalVisible, setModalVisible] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const toggleCheckbox = (index) => {
    const updated = [...checkedRows];
    updated[index] = !updated[index];
    setCheckedRows(updated);
    
    if (onDataChange) {
      onDataChange({
        checkedRows: updated,
        selectedUsers,
        tableData
      });
    }
  };

  const toggleUser = (user) => {
    const users = [...selectedUsers];
    const currentUsers = users[activeRow];
    if (currentUsers.includes(user)) {
      users[activeRow] = currentUsers.filter((u) => u !== user);
    } else {
      users[activeRow] = [...currentUsers, user];
    }
    setSelectedUsers(users);
    
    if (onDataChange) {
      onDataChange({
        checkedRows,
        selectedUsers: users,
        tableData
      });
    }
  };

  const tableStyles = StyleSheet.create({
    table: {
      // margin: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.tableBorder,
      backgroundColor: theme.colors.card,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: theme.colors.tableBorder,
    },
    headerRow: {
      backgroundColor: theme.colors.tableHeader,
    },
    cell: {
      width: 100,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftColor:theme.colors.tableBorder,
      borderLeftWidth:1
    },
    checkboxCell: {
      width: 50,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      

    },
    headerText: {
      fontWeight: '600',
      fontSize: 14,
      color: theme.colors.text,
      textAlign: 'center',
    },
    cellText: {
      fontSize: 14,
      color: theme.colors.text,
      textAlign: 'center',
    },
    linkText: {
      color: theme.colors.secondary,
      fontSize: 12,
      textAlign: 'center',
      fontWeight: '500',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: theme.colors.modalBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.colors.modalContent,
      padding: 24,
      margin: 20,
      borderRadius: 16,
      maxHeight: '80%',
      width: '85%',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    userOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 8,
      marginVertical: 2,
    },
    userOptionText: {
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: 8,
    },
    closeButton: {
      backgroundColor: 'rgb(255, 183, 0)',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    closeText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
    },
  });

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Project Phases
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tableStyles.table}>
          {/* Header Row */}
          <View style={[tableStyles.row, tableStyles.headerRow]}>
            <View style={tableStyles.checkboxCell} />
            {tableHead.map((head, index) => (
              <View key={index} style={tableStyles.cell}>
                <Text style={tableStyles.headerText}>{head}</Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {tableData.map((row, rowIndex) => (
            <View 
              key={rowIndex} 
              style={[
                tableStyles.row,
                { backgroundColor: rowIndex % 2 === 0 ? theme.colors.tableRowEven : theme.colors.tableRowOdd }
              ]}
            >
              <View style={tableStyles.checkboxCell}>
                <CheckBox
                  checked={checkedRows[rowIndex]}
                  onPress={() => toggleCheckbox(rowIndex)}
                  containerStyle={{ padding: 0, margin: 0 }}
                  checkedColor={theme.colors.primary}
                />
              </View>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={tableStyles.cell}>
                  {cellIndex === 2 ? (
                    <TouchableOpacity 
                      onPress={() => {
                        setActiveRow(rowIndex);
                        setModalVisible(true);
                      }}
                      style={{ padding: 4 }}
                    >
                      <Text style={tableStyles.linkText}>
                        {selectedUsers[rowIndex].length > 0
                          ? `${selectedUsers[rowIndex].length} user(s) selected`
                          : 'Select users'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={tableStyles.cellText}>{cell}</Text>
                  )}
                </View>
              ))}
            </View>
          ))}

          {/* Modal for User Selection */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={tableStyles.modalBackground}>
              <View style={tableStyles.modalContainer}>
                <Text style={tableStyles.modalTitle}>Select Users</Text>
                <FlatList
                  data={USERS_LIST}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      onPress={() => toggleUser(item)} 
                      style={tableStyles.userOption}
                    >
                      <CheckBox
                        checked={selectedUsers[activeRow]?.includes(item)}
                        onPress={() => toggleUser(item)}
                        containerStyle={{ padding: 0, margin: 0 }}
                        checkedColor={theme.colors.primary}
                      />
                      <Text style={tableStyles.userOptionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)} 
                  style={tableStyles.closeButton}
                >
                  <Text style={tableStyles.closeText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const CreateJobScreen = ({ navigation, route }) => {
  // Use the light theme
  const { theme } = useContext(ProfileContext);
  
  const [formData, setFormData] = useState({
    jobno: '',
    client: '',
  });

  const [tableData, setTableData] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [clientOpen, setClientOpen] = useState(false);
  const [clientValue, setClientValue] = useState(null);
  const [productOpen, setProductOpen] = useState(false);
  const [productValue, setProductValue] = useState(null);
  const [TLOpen, setTLOpen] = useState(false);
  const [TLValue, setTLValue] = useState(null);

  const [clientItems, setClientItems] = useState([
    { label: 'Client A', value: 'client_a' },
    { label: 'Client B', value: 'client_b' },
    { label: 'Client C', value: 'client_c' },
  ]);

  const [productItems, setProductItems] = useState([
    { label: 'Product X', value: 'product_x' },
    { label: 'Product Y', value: 'product_y' },
    { label: 'Product Z', value: 'product_z' },
  ]);

  const [TLItems, setTLItems] = useState([
    { label: 'abc', value: 'abc' },
    { label: 'xyz', value: 'xyz' },
    { label: 'ram', value: 'ram' },
  ]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTableDataChange = (data) => {
    setTableData(data);
  };

  const showDatePicker = () => {
    setMode('date');
    setDatePickerVisible(true);
  };

  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setDatePickerVisible(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    updateFormData('jobDate', currentDate);
  };

  const formatDate = (date) => {
    return moment(date).format('DD MMM YYYY');
  };

  const handlePostJob = () => {
    const jobData = {
      id: Date.now().toString(),
      jobDate: selectedDate,
      clientName: clientItems.find(item => item.value === clientValue)?.label || '',
      clientValue,
      productName: productItems.find(item => item.value === productValue)?.label || '',
      productValue,
      teamLead: TLItems.find(item => item.value === TLValue)?.label || '',
      teamLeadValue: TLValue,
      tableData,
      createdAt: new Date(),
      ...formData
    };

    if (route.params?.onJobCreated) {
      route.params.onJobCreated(jobData);
    }
    
    navigation.goBack();
    Alert.alert('Success', 'Job posted successfully!');
  };

  const handleCreateJob = async () => {
    const url = "http://192.168.0.211/job/api/createjob";

    try {
      const result = await POSTNETWORK(url, formData, true);
      console.log('Job API response:', result);

      if (result?.status === 'success') {
        Alert.alert('Success', 'Job added successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', result?.message || 'Failed to add job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      Alert.alert('Error', 'Failed to submit job');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <MyStatusBar backgroundColor="rgb(255, 183, 0)" barStyle="dark-content" />

      <HeaderComp
        title="Create Job"
        leftIcon="arrow-left"
        backgroundColor='rgb(255, 183, 0)'
        titleColor="#ffffff"
        iconColor="#ffffff"
        onLeftPress={() => navigation.goBack()}
        showShadow={false}
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {/* Date Picker */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Job Details
              </Text>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Job Date <Text style={{ color: theme.colors.error }}>*</Text>
                </Text>
                <TouchableOpacity
                  style={[styles.dateInput, {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                  }]}
                  onPress={showDatePicker}
                >
                  <Icon 
                    name="calendar" 
                    size={20} 
                    color={theme.colors.textSecondary} 
                  />
                  <Text style={[styles.dateTimeText, { color: theme.colors.text }]}>
                    {formatDate(selectedDate)}
                  </Text>
                  <Icon 
                    name="chevron-down" 
                    size={20} 
                    color={theme.colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.halfWidth, { zIndex: 3000}]}>
                  <Text style={[styles.label, { color: theme.colors.text }]}>
                    Client Name <Text style={{ color: theme.colors.error }}>*</Text>
                  </Text>
                  <DropDownPicker
                    open={clientOpen}
                    value={clientValue}
                    items={clientItems}
                    setOpen={setClientOpen}
                    setValue={setClientValue}
                    setItems={setClientItems}
                    placeholder="Select Client"
                    style={[styles.dropdown, {
                      backgroundColor: theme.colors.inputBackground,
                      borderColor: theme.colors.inputBorder,
                      zIndex: 1200
                    }]}
                    dropDownContainerStyle={[styles.dropdownContainer, {
                      borderColor: theme.colors.inputBorder,
                      backgroundColor: theme.colors.inputBackground,
                    }]}
                    textStyle={{
                      color: theme.colors.text,
                      fontSize: 16,
                    }}
                    placeholderStyle={{
                      color: theme.colors.inputPlaceholder,
                    }}
                    arrowIconStyle={{
                      tintColor: theme.colors.textSecondary,
                    }}
                    tickIconStyle={{
                      tintColor: theme.colors.primary,
                    }}
                    containerProps={{
                      style: {
                        // height: clientOpen ? 160 : undefined,
                        // zIndex: clientOpen ? 3000 : 2000,

                      },
                    }}
                  />
                </View>

                {/* Product Name */}
              <View style={[styles.halfWidth, { zIndex: 2000}]}>
                  <Text style={[styles.label, { color: theme.colors.text }]}>
                    Product Name <Text style={{ color: theme.colors.error }}>*</Text>
                  </Text>
                  <DropDownPicker
                    open={productOpen}
                    value={productValue}
                    items={productItems}
                    setOpen={setProductOpen}
                    setValue={setProductValue}
                    setItems={setProductItems}
                    placeholder="Select Product"
                    style={[styles.dropdown, {
                      backgroundColor: theme.colors.inputBackground,
                      borderColor: theme.colors.inputBorder,
                      zIndex: 1100
                    }]}
                    dropDownContainerStyle={[styles.dropdownContainer, {
                      borderColor: theme.colors.inputBorder,
                      backgroundColor: theme.colors.inputBackground,
                    }]}
                    textStyle={{
                      color: theme.colors.text,
                      fontSize: 16,
                    }}
                    placeholderStyle={{
                      color: theme.colors.inputPlaceholder,
                    }}
                    arrowIconStyle={{
                      tintColor: theme.colors.textSecondary,
                    }}
                    tickIconStyle={{
                      tintColor: theme.colors.primary,
                    }}
                 
                  />
                </View>
            </View>

          
           
       

            {/* Team Lead Selection */}
              <View style={[styles.halfWidth, { zIndex: 1000}]}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Team Lead <Text style={{ color: theme.colors.error }}>*</Text>
                </Text>
                <DropDownPicker
                  open={TLOpen}
                  value={TLValue}
                  items={TLItems}
                  setOpen={setTLOpen}
                  setValue={setTLValue}
                  setItems={setTLItems}
                  placeholder="Select Team Lead"
                  style={[styles.dropdown, {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                  }]}
                  dropDownContainerStyle={[styles.dropdownContainer, {
                    borderColor: theme.colors.inputBorder,
                    backgroundColor: theme.colors.inputBackground,
                  }]}
                  textStyle={{
                    color: theme.colors.text,
                    fontSize: 16,
                  }}
                  placeholderStyle={{
                    color: theme.colors.inputPlaceholder,
                  }}
                  arrowIconStyle={{
                    tintColor: theme.colors.textSecondary,
                  }}
                  tickIconStyle={{
                    tintColor: theme.colors.primary,
                  }}
               
                />
              </View>

            {/* Custom Table */}
            <CustomTable onDataChange={handleTableDataChange} theme={theme} />

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handlePostJob}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Create Job</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal - Android */}
      {Platform.OS === 'android' && datePickerVisible && (
        <DateTimePicker
          testID="datePicker"
          value={selectedDate}
          mode="date"
          is24Hour={false}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
 
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateTimeText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  dropdown: {
     width: '100%',
        marginBottom: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
  },
  dropdownContainer: {
    // borderRadius: 12,
    // borderWidth: 1,
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    // elevation: 4,
        borderColor: '#ccc',

  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  submitButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: 'rgba(255, 180, 98, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor:'rgb(255, 183, 0)'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateJobScreen;