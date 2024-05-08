import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';

const Splash = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSecondModal(false);
    setShowPaymentModal(false);
  };

  const handleSubscription = (subscriptionType: string) => {
    if (
      subscriptionType === 'Annual subscription (TMDB-Movie Database TvShow)' ||
      subscriptionType === 'Monthly subscription (TMDB-Movie Database TvShow)'
    ) {
      setShowSecondModal(true); // Open second modal for both annual and monthly subscriptions
    } else {
      // Handle other subscription logic here
      console.log(`Subscribed to ${subscriptionType}`);
      closeModal();
    }
  };

  const handleMonthlySubscription = () => {
    setShowPaymentModal(true); // Show payment method modal for monthly subscription
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', bottom: 10}}>
        This product uses the TMDB API but is not endorsed or certified By TMDB
      </Text>
      <TouchableOpacity style={styles.box} onPress={() => navigateTo('Movie')}>
        <Text style={styles.text}>Movie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigateTo('TVShow')}>
        <Text style={styles.text}>TV Show</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigateTo('Favorite')}>
        <Text style={styles.text}>Favorite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={openModal}>
        <Text style={styles.text}>Subscribe</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText1}>Subscribe</Text>
            <Text style={styles.modalText2}>Disable ads</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                handleSubscription(
                  'Annual subscription (TMDB-Movie Database TvShow)',
                )
              }>
              <Text style={styles.subscriptionText}>
                Annual subscription (TMDB-Movie Database TvShow)
              </Text>
              <Text style={styles.priceText}>Rs 500.00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                handleSubscription(
                  'Annual subscription (TMDB-Movie Database TvShow)',
                )
              }>
              <Text style={styles.subscriptionText}>
                Annual subscription (TMDB-Movie Database TvShow)
              </Text>
              <Text style={styles.priceText}>Rs 5000.00</Text>
            </TouchableOpacity>

            {/* Close Button */}
            {/* <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      {/* Second Modal */}
      <Modal visible={showSecondModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent1}>
            <Text style={styles.modalText4}>Google Play</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#363535',
                width: 400,
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/tmdbimg.jpeg')}
                style={styles.TmdbImage}
              />
              <View>
                <Text style={styles.modalText3}>Monthly Subscripltin.</Text>
                <Text style={styles.modalText5}>
                  TMDB - Movie Database TV Shows .
                </Text>
              </View>
            </View>
            {/* Add content for the second modal as needed */}

            {/* Close Button for Second Modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close Second Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}>
        <View style={[styles.modalContainer1, {backgroundColor: 'white'}]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select Payment Method</Text>
            {/* Add payment method selection UI here */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close Payment Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  box: {
    width: 300,
    height: 150,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 2, 2, 0.5)',
    width: '100%',
  },
  modalContainer1: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 120,
  },
  modalContent: {
    backgroundColor: '#585151',
    width: '100%', // Full width
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalContent1: {
    backgroundColor: 'white',
    width: '100%', // Full width
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    color: 'white',
  },
  modalText3: {
    fontSize: 15,
    marginBottom: 30,
    left: 35,
    color: 'black',
    fontWeight: 'bold',
    top: 15,
  },
  modalText4: {
    fontSize: 15,
    marginBottom: 15,
    color: 'black',
    right: 140,
    alignItems: 'center',
    textAlign: 'center',
  },
  modalText5: {
    fontSize: 15,
    left: 35,
    bottom: 15,
  },
  modalText1: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  modalText2: {
    fontSize: 15,
    marginBottom: 20,
    color: 'white',
  },
  TmdbImage: {
    height: 40,
    width: 45,
    resizeMode: 'contain',
    left: 20,
    justifyContent: 'space-between',
    top: 15,
  },
  subscriptionText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
    flexWrap: 'wrap',
  },
  priceText: {
    fontSize: 12,
    color: 'white',
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Splash;
