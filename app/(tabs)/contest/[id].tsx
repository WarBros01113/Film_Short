import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  ArrowLeft, 
  Trophy, 
  Calendar, 
  Users, 
  Gift, 
  Clock, 
  Upload,
  FileVideo,
  Type,
  Globe,
  FileText
} from 'lucide-react-native';

interface ContestDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  language: string;
  endDate: string;
  participants: number;
  prize: string;
  daysLeft: number;
  rules: string[];
  eligibility: string[];
  judgingCriteria: string[];
  submissionDeadline: string;
  organizerName: string;
  organizerAvatar: string;
}

// Mock contest details data
const mockContestDetails: ContestDetails = {
  id: '1',
  title: 'Monthly Short Film Contest',
  description: 'Submit your best short film and win amazing prizes! This contest celebrates creativity, storytelling, and technical excellence in short-form cinema. Whether you\'re a seasoned filmmaker or just starting your journey, this is your chance to showcase your talent to a global audience and compete for substantial prizes.',
  thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
  language: 'English',
  endDate: '2024-02-15',
  participants: 234,
  prize: '$5000',
  daysLeft: 15,
  rules: [
    'Maximum duration: 15 minutes',
    'Original content only - no copyrighted material',
    'HD quality required (minimum 1080p)',
    'English language or English subtitles required',
    'One submission per participant',
    'Must be completed within the last 12 months',
    'No explicit content or violence',
    'Proper credits must be included'
  ],
  eligibility: [
    'Must be 18 years or older',
    'Open to filmmakers worldwide',
    'Both amateur and professional filmmakers welcome',
    'Individual or team submissions accepted',
    'Previous winners are eligible to participate'
  ],
  judgingCriteria: [
    'Storytelling and narrative structure (30%)',
    'Technical quality and cinematography (25%)',
    'Originality and creativity (25%)',
    'Overall impact and emotional resonance (20%)'
  ],
  submissionDeadline: 'February 15, 2024 at 11:59 PM PST',
  organizerName: 'ReelFlix Contest Team',
  organizerAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
};

export default function ContestDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [contest, setContest] = useState<ContestDetails | null>(null);
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    description: '',
    language: '',
    videoFile: null as string | null,
  });

  useEffect(() => {
    // In a real app, fetch contest details based on ID
    setContest(mockContestDetails);
  }, [id]);

  const handleSubmitEntry = () => {
    setSubmissionModalVisible(true);
  };

  const handleFormSubmit = () => {
    if (!submissionForm.title || !submissionForm.description || !submissionForm.language) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // In a real app, this would upload the video and submit the entry
    Alert.alert(
      'Success!',
      'Your entry has been submitted successfully. Good luck!',
      [
        {
          text: 'OK',
          onPress: () => {
            setSubmissionModalVisible(false);
            setSubmissionForm({ title: '', description: '', language: '', videoFile: null });
          },
        },
      ]
    );
  };

  const handleVideoUpload = () => {
    // In a real app, this would open file picker or camera
    Alert.alert('Video Upload', 'Video upload functionality would be implemented here');
    setSubmissionForm({ ...submissionForm, videoFile: 'mock_video.mp4' });
  };

  const renderRuleItem = (rule: string, index: number) => (
    <View key={index} style={styles.ruleItem}>
      <View style={styles.ruleBullet} />
      <Text style={styles.ruleText}>{rule}</Text>
    </View>
  );

  const renderEligibilityItem = (item: string, index: number) => (
    <View key={index} style={styles.ruleItem}>
      <View style={styles.ruleBullet} />
      <Text style={styles.ruleText}>{item}</Text>
    </View>
  );

  const renderCriteriaItem = (criteria: string, index: number) => (
    <View key={index} style={styles.ruleItem}>
      <View style={styles.ruleBullet} />
      <Text style={styles.ruleText}>{criteria}</Text>
    </View>
  );

  if (!contest) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contest Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contest Header */}
        <View style={styles.contestHeader}>
          <Image source={{ uri: contest.thumbnail }} style={styles.contestImage} />
          <View style={styles.contestBadge}>
            <Trophy size={16} color="#fff" />
            <Text style={styles.badgeText}>ACTIVE</Text>
          </View>
        </View>

        {/* Contest Info */}
        <View style={styles.contestInfo}>
          <Text style={styles.contestTitle}>{contest.title}</Text>
          
          <View style={styles.contestMeta}>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Calendar size={16} color="#E50914" />
                <Text style={styles.metaText}>{contest.daysLeft} days left</Text>
              </View>
              <View style={styles.metaItem}>
                <Users size={16} color="#E50914" />
                <Text style={styles.metaText}>{contest.participants} participants</Text>
              </View>
            </View>
            <View style={styles.prizeContainer}>
              <Gift size={20} color="#FFD700" />
              <Text style={styles.prizeText}>Prize: {contest.prize}</Text>
            </View>
          </View>

          {/* Organizer Info */}
          <View style={styles.organizerContainer}>
            <Image source={{ uri: contest.organizerAvatar }} style={styles.organizerAvatar} />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerLabel}>Organized by</Text>
              <Text style={styles.organizerName}>{contest.organizerName}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Description</Text>
            <Text style={styles.description}>{contest.description}</Text>
          </View>

          {/* Rules */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contest Rules</Text>
            <View style={styles.rulesList}>
              {contest.rules.map(renderRuleItem)}
            </View>
          </View>

          {/* Eligibility */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eligibility Requirements</Text>
            <View style={styles.rulesList}>
              {contest.eligibility.map(renderEligibilityItem)}
            </View>
          </View>

          {/* Judging Criteria */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Judging Criteria</Text>
            <View style={styles.rulesList}>
              {contest.judgingCriteria.map(renderCriteriaItem)}
            </View>
          </View>

          {/* Submission Deadline */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Important Dates</Text>
            <View style={styles.deadlineContainer}>
              <Clock size={20} color="#E50914" />
              <View style={styles.deadlineInfo}>
                <Text style={styles.deadlineLabel}>Submission Deadline</Text>
                <Text style={styles.deadlineText}>{contest.submissionDeadline}</Text>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEntry}>
            <Upload size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Submit Your Entry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Submission Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={submissionModalVisible}
        onRequestClose={() => setSubmissionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Submit Your Entry</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setSubmissionModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              {/* Video Upload */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Video File *</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handleVideoUpload}>
                  <FileVideo size={24} color="#E50914" />
                  <Text style={styles.uploadButtonText}>
                    {submissionForm.videoFile ? 'Video Selected' : 'Choose Video File'}
                  </Text>
                </TouchableOpacity>
                {submissionForm.videoFile && (
                  <Text style={styles.fileName}>{submissionForm.videoFile}</Text>
                )}
              </View>

              {/* Title */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Film Title *</Text>
                <View style={styles.inputContainer}>
                  <Type size={20} color="#666" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your film title"
                    placeholderTextColor="#666"
                    value={submissionForm.title}
                    onChangeText={(text) => setSubmissionForm({ ...submissionForm, title: text })}
                  />
                </View>
              </View>

              {/* Language */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Language *</Text>
                <View style={styles.inputContainer}>
                  <Globe size={20} color="#666" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., English, Tamil, Hindi"
                    placeholderTextColor="#666"
                    value={submissionForm.language}
                    onChangeText={(text) => setSubmissionForm({ ...submissionForm, language: text })}
                  />
                </View>
              </View>

              {/* Description */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description *</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <FileText size={20} color="#666" style={styles.textAreaIcon} />
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Describe your film, its story, and inspiration..."
                    placeholderTextColor="#666"
                    value={submissionForm.description}
                    onChangeText={(text) => setSubmissionForm({ ...submissionForm, description: text })}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={styles.modalSubmitButton} onPress={handleFormSubmit}>
                <Text style={styles.modalSubmitText}>Submit Entry</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#000000',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  contestHeader: {
    position: 'relative',
    height: 200,
  },
  contestImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contestBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginLeft: 5,
  },
  contestInfo: {
    padding: 20,
  },
  contestTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 15,
  },
  contestMeta: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    marginLeft: 6,
  },
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prizeText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFD700',
    marginLeft: 8,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  organizerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginBottom: 2,
  },
  organizerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 24,
  },
  rulesList: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E50914',
    marginTop: 8,
    marginRight: 12,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 20,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
  },
  deadlineInfo: {
    marginLeft: 12,
  },
  deadlineLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginBottom: 2,
  },
  deadlineText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E50914',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  modalCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#fff',
  },
  modalForm: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
  textAreaIcon: {
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    marginLeft: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#E50914',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#E50914',
    marginLeft: 8,
  },
  fileName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginTop: 5,
  },
  modalSubmitButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  modalSubmitText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
});