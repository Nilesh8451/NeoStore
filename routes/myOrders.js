import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import LoadingScreen from './loadingScreen';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props contains user order from redux state.
 * @description this screen will show user orders in short information which contains order number total cost and transaction date.
 * @returns jsx which contains user orders in card
 */

function MyOrders(props) {
  const [myOrder, setMyOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.order) {
      setMyOrder(props.order);
      setIsLoading(false);
    }
  }, [props.order]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return myOrder.length > 0 ? (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              {myOrder.map((item, index) => {
                var x = item.product_details[0].total_cartCost;
                x = x.toString();
                var lastThree = x.substring(x.length - 3);
                var otherNumbers = x.substring(0, x.length - 3);
                if (otherNumbers != '') lastThree = ',' + lastThree;
                var totalCartCost =
                  otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
                  lastThree;

                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      props.navigation.navigate('OrderDetail', {
                        order_id: item.product_details[0].order_id,
                        order: item,
                      });
                    }}>
                    <View style={styles.productCardContent}>
                      <View style={styles.productCard}>
                        <View style={styles.cardDetail}>
                          <Text
                            style={{
                              fontSize: 22,
                              fontWeight: 'bold',
                            }}>
                            ID: {item.product_details[0].order_id}
                          </Text>
                          <View style={styles.orderCostView}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#EF5B3E',
                              }}>
                              ₹ {totalCartCost}
                            </Text>
                          </View>
                          <Text
                            numberOfLines={1}
                            style={{fontSize: 16, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', opacity: 0.8}}>
                              Ordered Date :
                            </Text>{' '}
                            {moment(item.product_details[0].createdAt).format(
                              'llll',
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.noOrdersView}>
          <Image
            source={require('../assets/images/emptycart.png')}
            style={{width: 70, height: 70, opacity: 0.9}}
          />
          <Text
            style={{
              fontSize: 18,
              marginTop: 10,
              fontWeight: 'bold',
              opacity: 0.8,
            }}>
            You Haven't Placed Any Order yet
          </Text>
          <Text style={{fontSize: 16, marginTop: 10, textAlign: 'center'}}>
            Before proceed to checkout you must add some products to you
            shopping cart. You will find lots of intresting products on our
            products page
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  productCardContainer: {
    marginBottom: 20,
  },
  productCardContent: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  productCard: {
    paddingVertical: 15,
    flexDirection: 'row',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardDetail: {
    width: '90%',
    marginLeft: 20,
  },
  cartItemAction: {
    width: 110,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCostView: {
    marginTop: -15,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  noOrdersView: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 30,
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    order: state.userReducer.order,
  };
};

export default connect(mapStateToProps)(MyOrders);
