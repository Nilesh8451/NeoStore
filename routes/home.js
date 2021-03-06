import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  getAllCategoriesData,
  getDefaultTopRatingProducts,
} from '../redux/dashboard/dashboardAction';
import {
  restoreLoginData,
  getUserCartData,
  restoreUserCartData,
} from '../redux/user/userAction';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SomethingWrong from './somethingWentWrong';
import LoadingScreen from './loadingScreen';
import Card from '../shared/card';

let timerId;

const debounce = (fn, delay) => {
  return (...args) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {LoadingData,categories,topRatedProduct,getAllCategories,getTopRatingProducts,restoreData,navigation} props  LoadingData is a boolean value which is true if application is making asynchronous call and false otherwise,categories is array contains all categories available in app, topRatedProduct which is array of object which contains top product of each category, getAllCategories and getTopRatingProducts is a function to make call to api to fetch data and store in redux store, restore data is a function which grab user information from async storage if user havan't perform signout last time he/she visited app. navigation is a object which is use to navigate between different screens.
 * @description home screen contains carousel of each category available in app and top rated products of each category.
 * @return jsx which is used to display content of products and some buttons to perform action.
 */

function Home({
  LoadingData,
  categories,
  topRatedProduct,
  cart,
  error,
  getAllCategories,
  getTopRatingProducts,
  restoreData,
  restoreCartData,
  navigation,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  const restoreUserInfo = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfo');
      const parseUserData = await JSON.parse(user);

      if (user !== null) {
        restoreData(parseUserData);
      }
    } catch (error) {}
  };

  const restoreUserCartInfo = async () => {
    try {
      const cartData = await AsyncStorage.getItem('userCartData');
      const parseCartData = await JSON.parse(cartData);

      if (cartData !== null) {
        restoreCartData(parseCartData);
      }
    } catch (error) {}
  };

  const storeUserCartData = async (data) => {
    try {
      await AsyncStorage.setItem('userCartData', JSON.stringify(data));
    } catch (e) {}
  };

  useEffect(() => {
    restoreUserInfo();
    restoreUserCartInfo();
    getAllCategories();
    getTopRatingProducts();
  }, []);

  useEffect(() => {
    storeUserCartData(cart);
  }, [cart]);

  const handleChange = (val) => {
    if (val == '') {
      setSearchLoading(true);
    }
    setSearchInput(val);
    debounceSearch(val);
  };

  const handleSearch = (text) => {
    setSearchLoading(true);
    axios
      .get(`http://180.149.241.208:3022/getProductBySearchText/${text}`)
      .then((res) => {
        if (res.data.product_details == 'No details are available') {
          setSearchResult([]);
        } else {
          setSearchResult(res.data.product_details);
        }
        setSearchLoading(false);
      })
      .catch((e) => {
        // console.log("Get Product By Search Error ",e);
        setSearchLoading(false);
      });
  };

  const debounceSearch = debounce(handleSearch, 400);

  if (error) {
    return <SomethingWrong />;
  }

  if (LoadingData) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode={searchInput.length > 0 ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps={
            searchInput.length > 0 ? 'always' : 'never'
          }
          contentContainerStyle={{}}>
          <View style={styles.searchBox}>
            <View
              style={{
                marginBottom: 12,
                marginHorizontal: 5,
              }}>
              <FontAwesome5
                name={'search'}
                color={'black'}
                solid
                size={21}
                style={{
                  position: 'absolute',
                  left: 16,
                  top: 22,
                  opacity: 0.5,
                  zIndex: 1,
                }}
                onPress={() => {}}
              />
              <TextInput
                style={styles.input}
                placeholder="Search Product By Name...."
                value={searchInput}
                onChangeText={(val) => handleChange(val)}
              />
            </View>
          </View>
          {searchInput.length === 0 ? (
            <View>
              <View style={{width: '100%', backgroundColor: '#2874F0'}}>
                <View style={styles.sliderContainer}>
                  <Swiper
                    autoplay
                    loop
                    horizontal={true}
                    height={200}
                    activeDotColor="#FF6347">
                    {categories.map((category, index) => {
                      return (
                        <View style={styles.slide} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('ViewProduct', {
                                category_name: category.category_name,
                                category_id: category.category_id,
                              });
                            }}>
                            <Image
                              source={{
                                uri: `http://180.149.241.208:3022/${category.product_image}`,
                              }}
                              resizeMode="cover"
                              style={styles.sliderImage}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </Swiper>
                </View>
              </View>

              <View style={styles.popularProducts}>
                <View style={styles.popularProductsHeader}>
                  <Text style={{fontSize: 18}}>Popular Products</Text>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('ViewProduct');
                    }}>
                    <Text style={{fontSize: 17, marginTop: 10}}>View All</Text>
                  </TouchableWithoutFeedback>
                </View>

                <View style={styles.productCardContainer}>
                  {topRatedProduct.map((product, index) => {
                    var x = product.DashboardProducts[0].product_cost;
                    x = x.toString();
                    var lastThree = x.substring(x.length - 3);
                    var otherNumbers = x.substring(0, x.length - 3);
                    if (otherNumbers != '') lastThree = ',' + lastThree;
                    var res =
                      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
                      lastThree;

                    return (
                      <Card
                        key={index}
                        index={index}
                        productName={product.DashboardProducts[0].product_name}
                        productCost={res}
                        productId={product.DashboardProducts[0].product_id}
                        navigation={navigation}
                        productImage={
                          product.DashboardProducts[0].product_image
                        }
                        product={product}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          ) : searchLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
              }}>
              <ActivityIndicator size={'large'} color={'blue'} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 10,
              }}>
              {searchResult.length > 0 ? (
                <ScrollView
                  keyboardDismissMode={'on-drag'}
                  keyboardShouldPersistTaps={'always'}>
                  {searchResult.map((res, ind) => (
                    <TouchableWithoutFeedback
                      key={ind}
                      onPress={() => {
                        setSearchInput('');
                        Keyboard.dismiss();
                        navigation.navigate('ProductDetail', {
                          product_name: res.product_name,
                          product_id: res.product_id,
                        });
                      }}>
                      <View style={styles.searchResultMainDiv}>
                        <View
                          style={{
                            width: '80%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              opacity: 0.8,
                            }}>
                            {res.product_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 4,
                            paddingHorizontal: 6,
                          }}>
                          <FontAwesome5
                            name={'long-arrow-alt-left'}
                            color={'black'}
                            solid
                            size={21}
                            style={{
                              transform: [{rotate: '45deg'}],
                              opacity: 0.6,
                            }}
                            onPress={() => {
                              setSearchInput(res.product_name);
                              handleChange(res.product_name);
                            }}
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </ScrollView>
              ) : (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 40,
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name={'exclamation-circle'}
                      color={'red'}
                      solid
                      size={90}
                      style={{opacity: 0.5}}
                      onPress={() => {}}
                    />
                    <Text style={{marginTop: 15, fontSize: 20}}>
                      No Such Product Available
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBox: {
    backgroundColor: '#2874F0',
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    marginTop: 7,
    padding: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    paddingLeft: 45,
    paddingRight: 40,
    borderRadius: 5,
    marginHorizontal: 2,
  },

  sliderContainer: {
    height: 200,
    width: '98%',
    marginBottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 3,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },

  popularProducts: {
    backgroundColor: '#F1F3F6',
  },
  popularProductsHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 13,
    backgroundColor: 'white',
  },
  productCardContainer: {
    marginBottom: 20,
  },

  searchResultMainDiv: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

const mapStateToProps = (state) => {
  return {
    categories: state.dashBoardReducer.categories,
    topRatedProduct: state.dashBoardReducer.topRatedProduct,
    LoadingData: state.dashBoardReducer.isLoading,
    cart: state.userReducer.cart,
    error: state.dashBoardReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategoriesData()),
    getTopRatingProducts: () => dispatch(getDefaultTopRatingProducts()),
    restoreData: (user) => dispatch(restoreLoginData(user)),
    getDataOfUserCart: (token) => dispatch(getUserCartData(token)),
    restoreCartData: (data) => dispatch(restoreUserCartData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
