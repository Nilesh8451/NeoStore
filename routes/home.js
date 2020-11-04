import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  getAllCategoriesData,
  getDefaultTopRatingProducts,
} from '../redux/dashboard/dashboardAction';
import {restoreLoginData} from '../redux/user/userAction';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let timerId;

const debounce = (fn, delay) => {
  return (...args) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

function Home({
  LoadingData,
  categories,
  topRatedProduct,
  getAllCategories,
  getTopRatingProducts,
  restoreData,
  navigation,
}) {
  // console.log('Cate', categories);
  // console.log('top', topRatedProduct);
  // console.log('isloading', LoadingData);
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

  useEffect(() => {
    restoreUserInfo();
    getAllCategories();
    getTopRatingProducts();
  }, []);

  const handleChange = (val) => {
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
        console.log(e);
        setSearchLoading(false);
      });
  };

  const debounceSearch = debounce(handleSearch, 1000);

  if (LoadingData) {
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../assets/json/loader2.json')}
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          loop
        />
      </View>
    );
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
                  left: 14,
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
                // onChange={handleChange}
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
                              console.log('CLiced', category);
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
                      console.log('clicked on view all');
                    }}>
                    <Text style={{fontSize: 17, marginTop: 10}}>View All</Text>
                  </TouchableWithoutFeedback>
                </View>

                <View style={styles.productCardContainer}>
                  {topRatedProduct.map((product, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => {
                        console.log('Clicked on Card');
                        navigation.navigate('ProductDetail', {
                          product_name:
                            product.DashboardProducts[0].product_name,
                          product_id: product.DashboardProducts[0].product_id,
                        });
                      }}>
                      <View style={styles.productCardContent}>
                        <View style={styles.productCard}>
                          <ImageBackground
                            source={{
                              uri: `http://180.149.241.208:3022/${product.DashboardProducts[0].product_image}`,
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              // borderRadius: 20,
                            }}
                            resizeMode={'cover'}
                            borderRadius={6}
                            imageStyle={{}}>
                            <View
                              style={{
                                flex: 1,
                                borderRadius: 6,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent:
                                  index % 2 ? 'flex-start' : 'flex-end',
                                backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,

                                elevation: 3,
                              }}>
                              <View
                                style={{
                                  marginLeft: index % 2 && 30,
                                  marginRight: index % 2 ? 0 : 30,
                                  alignItems:
                                    index % 2 ? 'flex-start' : 'flex-end',
                                  maxWidth: 200,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold',
                                  }}
                                  numberOfLines={1}>
                                  {product.DashboardProducts[0].product_name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    color: 'white',
                                    fontWeight: 'bold',
                                  }}>
                                  {product.DashboardProducts[0].product_cost}
                                </Text>
                              </View>
                            </View>
                          </ImageBackground>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
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
                // backgroundColor: 'yellow',
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
                        // console.log('click  ', res.product_id);
                        // console.log(`Clicked on ${res.product_name}`);
                        setSearchInput('');
                        Keyboard.dismiss();
                        navigation.navigate('ProductDetail', {
                          product_name: res.product_name,
                          product_id: res.product_id,
                        });
                      }}>
                      <View
                        style={{
                          width: '100%',
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderBottomColor: 'gray',
                        }}>
                        <View
                          style={{
                            width: '80%',
                            // backgroundColor: 'pink',
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
                            // backgroundColor: 'red',
                            padding: 4,
                            paddingHorizontal: 6,
                          }}>
                          <FontAwesome5
                            name={'long-arrow-alt-left'}
                            color={'black'}
                            // backgroundColor="black"
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
                      // backgroundColor: 'red',
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
    // backgroundColor: 'red',
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    marginTop: 7,
    padding: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    paddingLeft: 43,
    paddingRight: 40,
    borderRadius: 2,
  },

  sliderContainer: {
    height: 200,
    width: '98%',
    // paddingTop: 10,
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
    // flex: 1,
    backgroundColor: '#F1F3F6',
    // backgroundColor: 'red',
  },
  popularProductsHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 13,
    backgroundColor: 'white',
  },
  productCardContainer: {
    // backgroundColor: 'white',
    marginBottom: 20,
  },
  productCardContent: {
    // backgroundColor: 'white',
    // backgroundColor: 'red',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  productCard: {
    // paddingVertical: 15,
    // backgroundColor: 'pink',
    // borderRadius: 20,
    flexDirection: 'row',
    height: 120,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    // marginLeft: 10,
  },
  cardDetail: {
    // backgroundColor: 'red',
    width: '68%',
    marginLeft: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    categories: state.dashBoardReducer.categories,
    topRatedProduct: state.dashBoardReducer.topRatedProduct,
    LoadingData: state.dashBoardReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategoriesData()),
    getTopRatingProducts: () => dispatch(getDefaultTopRatingProducts()),
    restoreData: (user) => dispatch(restoreLoginData(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
