import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  Dimensions 
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../ProfileContext/ProfileContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MyStatusBar } from '../../constants/config';
import HeaderComp from '../../components/Header/HeaderComp';
import { GETNETWORK } from '../../utils/Network';
import { Loader } from '../../components/Loader';
import moment from 'moment';

const { width } = Dimensions.get('window');

const CreateJob = () => {
  const { theme } = useContext(ProfileContext);
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [localJobs, setLocalJobs] = useState([]); // For locally created jobs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetListItems();
  }, []);

  // Function to handle new job creation from AddJob screen
const handleJobCreated = useCallback((newJob) => {
  const transformedJob = {
    ProjectName: newJob.productName || `Job #${newJob.id}`, // Use product name if available
    JobSl: newJob.id,
    ClientName: newJob.clientName || 'Not specified',
    ProductName: newJob.productName || 'Not specified',
    CurrentPhaseUser: formatSelectedUsers(newJob.tableData),
    InChargeName: newJob.teamLead || 'Not specified',
    JobId: newJob.id,
    JobDate: moment(newJob.jobDate).format('YYYY-MM-DD'),
    isLocal: true,
    originalData: newJob
  };

  setLocalJobs(prevJobs => [transformedJob, ...prevJobs]);
}, []);


  // Navigate to AddJob screen with callback
  const navigateToAddJob = () => {
    navigation.navigate('AddJob', {
      onJobCreated: handleJobCreated
    });
  };

  // Format selected users from table data
  const formatSelectedUsers = (tableData) => {
    if (!tableData || !tableData.selectedUsers) return 'No users selected';
    
    const selectedUsers = tableData.selectedUsers
      .filter(users => users.length > 0)
      .flat();
    
    return selectedUsers.length > 0 
      ? selectedUsers.join(', ') 
      : 'No users selected';
  };

  // Format selected phases from table data
  const formatSelectedPhases = (tableData) => {
    if (!tableData || !tableData.checkedRows) return 'No phases selected';
    
    const selectedPhases = tableData.checkedRows
      .map((isChecked, index) => isChecked ? `Phase ${index + 1}` : null)
      .filter(phase => phase !== null);
    
    return selectedPhases.length > 0 
      ? selectedPhases.join(', ') 
      : 'No phases selected';
  };

  const GetListItems = async () => {
    const url = 'http://192.168.0.211/job/api/joblist';
    setLoading(true);
    
    try {
      const response = await GETNETWORK(url, true);
      if (response?.status === 'success' && Array.isArray(response.data)) {
        console.log('response====', response.data);
        setJobs(response.data);
      } else {
        console.warn('Unexpected API structure:', response);
      }
    } catch (error) {
      console.error('Error fetching job list:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combine API jobs and local jobs for display
  const combinedJobs = [...localJobs, ...jobs];

  const renderJobCard = ({ item }) => (
    <View style={[styles.jobItemCard, { backgroundColor: theme.colors.jobCard }]}>
      {/* Local job indicator */}
      {item.isLocal && (
        <View style={styles.localJobBadge}>
          <Text style={styles.localJobText}>New</Text>
        </View>
      )}
      
      <Text style={[styles.jobTitleText, { color: theme.colors.headerBackground }]}>
        {item.ProjectName} <Text style={{
          fontSize:15
        }}>({item.JobId})</Text>
      </Text>
      
      <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
  <Text style={{ fontSize: 15}}>Client Name: </Text>
  <Text style={{ fontSize: 13 }}> {item.ClientName}</Text>
        </Text>
      
      <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
          <Text style={{ fontSize: 15}}>Product Name:</Text>
         <Text style={{ fontSize: 13 }}> {item.ProductName}</Text>
      </Text>
      
      <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
        <Text style={{ fontSize: 15}}>Current Phase User:</Text>
         <Text style={{ fontSize: 13}}>{item.CurrentPhaseUser}</Text>
      </Text>
      
      {/* <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
        In Charge: {item.InCharge}
      </Text> */}
      
      <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
          <Text style={{ fontSize: 15}}>In Charge Name:</Text>
        <Text style={{ fontSize: 13 }}>  {item.InChargeName}</Text>
      </Text>
      
      
      {/* Additional info for local jobs */}
      {/* {item.isLocal && item.originalData && (
        <>
          <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
            Selected Phases: {formatSelectedPhases(item.originalData.tableData)}
          </Text>
          <Text style={[styles.jobDescText, { color: theme.colors.text }]}>
            Created: {moment(item.originalData.createdAt).format('DD MMM YYYY, hh:mm A')}
          </Text>
        </>
      )} */}
      
      <View style={styles.jobMetaRow}>
        <Text style={[styles.jobDate, { color: theme.colors.headerBackground }]}>
          Date: {item.JobDate}
        </Text>
      </View>
    </View>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="briefcase-outline" size={64} color={theme.colors.text} />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No Jobs Yet</Text>
     
    </View>
  );

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <MyStatusBar backgroundColor="rgb(255, 183, 0)" barStyle="dark-content" />
      <HeaderComp
        title="Job"
        leftIcon="arrow-left"
        backgroundColor="rgb(255, 183, 0)"
        titleColor="#ffffff"
        iconColor="#ffffff"
        onLeftPress={() => navigation.goBack()}
        showShadow={false}
      />

      <View style={[styles.container,{backgroundColor:theme.colors.cardBackground}]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Your Job Postings</Text>
          <TouchableOpacity
            onPress={navigateToAddJob}
            style={styles.addButton}
          >
            <Ionicons name="add-circle-outline" size={36} color="#FFA900" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color:'#FFA900' }]}>
            Recent Jobs ({combinedJobs.length})
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color:'#FFA900' }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList to render combined jobs */}
        <FlatList
          data={combinedJobs}
          renderItem={renderJobCard}
          keyExtractor={(item) => `${item.isLocal ? 'local-' : 'api-'}${item.JobSl}`}
          style={styles.jobList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshing={loading}
          onRefresh={GetListItems}
        />
      </View>

      <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor:'green'


  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // backgroundColor:'green'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  jobList: {
    flex: 1,
  },
  jobItemCard: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    position: 'relative',
  },
  localJobBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgb(255, 183, 0)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  localJobText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  jobTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobDescText: {
    fontSize: 14,
    marginBottom: 4,
    // lineHeight: 20,
  },
  jobMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#FFA900',
  },
  jobDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default CreateJob;