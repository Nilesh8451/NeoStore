import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import CustomModal from '../shared/modal';
import FlatButton from '../shared/button';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';

function ViewProduct({navigation}) {
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      rating: 3,
      product_name: 'Nokia Lumia 400',
      product_price: 40000,
    },
    {
      id: 2,
      rating: 5,
      product_name: 'Mou Bed With Mattress',
      product_price: 20000,
    },
    {
      id: 3,
      rating: 4.5,
      product_name: 'IPhone 12',
      product_price: 80000,
    },
    {
      id: 4,
      rating: 3,
      product_name: 'Freedom 251',
      product_price: 251,
    },
    {
      id: 5,
      rating: 4,
      product_name: 'Macbock Pro',
      product_price: 70000,
    },
    {
      id: 6,
      rating: 1.5,
      product_name: 'Macbock Pro2',
      product_price: 70000,
    },
    {
      id: 7,
      rating: 3.5,
      product_name: 'Macbock Pro3',
      product_price: 70000,
    },
    {
      id: 8,
      rating: 3,
      product_name: 'Macbock Pro4',
      product_price: 70000,
    },

    {
      id: 9,
      rating: 4,
      product_name: 'Macbock Pro5',
      product_price: 70000,
    },

    {
      id: 10,
      rating: 5,
      product_name: 'Macbock Pr6',
      product_price: 70000,
    },
    {
      id: 11,
      rating: 3,
      product_name: 'Macbock Pro7',
      product_price: 70000,
    },
    {
      id: 12,
      rating: 3,
      product_name: 'Macbock Pro8',
      product_price: 70000,
    },
    {
      id: 13,
      rating: 4,
      product_name: 'Macbock Pro9',
      product_price: 70000,
    },

    {
      rating: 2,
      id: 14,
      product_name: 'Macbock Pr10',
      product_price: 70000,
    },
    {
      id: 15,
      rating: 2,
      product_name: 'Macbock Pro11',
      product_price: 70000,
    },
    {
      id: 16,
      rating: 1,
      product_name: 'Macbock Pro12',
      product_price: 70000,
    },
    {
      id: 17,
      rating: 3,
      product_name: 'Macbock Pro13',
      product_price: 70000,
    },

    {
      id: 18,
      rating: 4,
      product_name: 'Macbock Pr14',
      product_price: 70000,
    },
    {
      id: 19,
      rating: 2.5,
      product_name: 'Macbock Pro15',
      product_price: 70000,
    },
    {
      id: 20,
      rating: 3,
      product_name: 'Macbock Pro16',
      product_price: 70000,
    },
    {
      id: 21,
      rating: 5,
      product_name: 'Macbock Pro17',
      product_price: 70000,
    },
  ]);

  const [displayProducts, setDisplayProducts] = useState([
    ...allProducts.slice(0, 5),
  ]);
  const [batch, setBatch] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [recentClicked, setRecentClicked] = useState('');
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);
  const [colorVal, setColorVal] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [costVal, setCostVal] = useState('');
  const [colors] = useState([
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ]);

  const [categories, setCategories] = useState([
    'Sofa',
    'Bed',
    'Chair',
    'Table',
    'Almirah',
  ]);

  const [costType, setCostType] = useState([
    'Price: Low To High',
    'Price: High To Low',
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadMore = () => {
    let start = batch * 5;
    let end = (batch + 1) * 5;

    if (end > allProducts.length) {
      end = allProducts.length;
    }
    const newData = allProducts.slice(start, end);
    setDisplayProducts((prevState) => {
      return [...prevState, ...newData];
    });
    Toast.show(`${end} OF ${allProducts.length}`, Toast.LONG);
    setBatch((preState) => preState + 1);
  };

  const renderFlatlistFooter = () => {
    return !(displayProducts.length === allProducts.length) ? (
      <View>
        <ActivityIndicator animating size="large" color={'blue'} />
      </View>
    ) : (
      <View>
        {/* {Toast.show(
          `${allProducts.length} OF ${allProducts.length}`,
          Toast.LONG,
        )} */}
      </View>
    );
  };

  if (isLoading) {
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
            // backgroundColor: 'red',
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
        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <FlatList
            data={displayProducts}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMore}
            ListFooterComponent={renderFlatlistFooter}
            onEndReachedThreshold={1}
            renderItem={({item, index}) => {
              return (
                <TouchableWithoutFeedback
                  key={item.id}
                  onPress={() => {
                    console.log('Clicked on Card');
                    navigation.navigate('ProductDetail', {
                      product_name: item.product_name,
                      product: item,
                    });
                  }}>
                  <View style={styles.productCardContent}>
                    <View style={styles.productCard}>
                      <ImageBackground
                        source={require('../assets/images/food-banner1.jpg')}
                        style={{
                          width: '100%',
                          height: '100%',
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
                              alignItems: index % 2 ? 'flex-start' : 'flex-end',
                              maxWidth: 200,
                            }}>
                            <Text
                              style={{fontSize: 21, color: 'white'}}
                              numberOfLines={1}>
                              {item.product_name}
                            </Text>
                            <Rating
                              ratingCount={5}
                              startingValue={item.rating}
                              imageSize={20}
                              type={'custom'}
                              readonly={true}
                              tintColor="rgba( 0, 0, 0, 0.5 )"
                            />
                            <Text style={{fontSize: 15, color: 'white'}}>
                              {item.product_price}
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>

        {/****************  Category Modal And Action Button **********************/}

        <CustomModal
          open={openCategoryModal}
          setOpen={setOpenCategoryModal}
          title="Select Category"
          setClickedVal={setCategoryVal}>
          <View
            style={{
              height: 130,
              borderWidth: 1,
              borderColor: 'gray',
              marginTop: 10,
              paddingVertical: 5,
            }}>
            <ScrollView style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      console.log('Setting a color with id', category);
                      setCategoryVal(category);
                    }}>
                    <View
                      style={{
                        width: '90%',

                        backgroundColor:
                          categoryVal === category
                            ? '#2874F0'
                            : 'rgba(0,0,0,0.1)',
                        marginBottom: 10,
                        borderWidth: 1.5,
                        borderColor: '',
                      }}>
                      <Text
                        style={{
                          marginLeft: 10,
                          paddingVertical: 8,
                          fontSize: 15,
                          color: categoryVal === category ? 'white' : 'black',
                        }}>
                        {category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={{marginTop: 10}}>
            <FlatButton
              title="FILTER"
              disabled={!categoryVal}
              color={!categoryVal ? 'gray' : '#2874F0'}
              onPress={() => {
                console.log('CLicked with category id of', categoryVal);
                setColorVal('');
                setOpenCategoryModal(false);
                Toast.show(
                  `Filtered List With ${categoryVal} category`,
                  Toast.LONG,
                );
              }}
            />
          </View>
        </CustomModal>

        <View style={styles.bottomActionView}>
          <View style={styles.bottomActionContent}>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log('clicked on Category');
                setOpenCategoryModal(true);
                setRecentClicked('Category');
              }}>
              <View style={styles.bottomActionContentBox}>
                <FontAwesome5
                  name={'list'}
                  color={recentClicked === 'Category' ? 'blue' : 'black'}
                  solid
                  size={20}
                  style={{}}
                />
                <Text
                  style={{
                    color: recentClicked === 'Category' ? 'blue' : 'black',
                  }}>
                  Category
                </Text>
              </View>
            </TouchableWithoutFeedback>

            {/****************  Color Modal And Action Button **********************/}

            <CustomModal
              open={openColorModal}
              setOpen={setOpenColorModal}
              title="Select Color"
              setClickedVal={setColorVal}>
              <View
                style={{
                  height: 130,
                  // backgroundColor: 'pink',
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginTop: 10,
                  paddingVertical: 5,
                }}>
                <ScrollView style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    {colors.map((color) => (
                      <TouchableOpacity
                        key={color}
                        onPress={() => {
                          console.log('Setting a color with colorCode', color);
                          setColorVal(color);
                        }}>
                        <View
                          style={{
                            width: !(colorVal === color) ? 45 : 50,
                            height: !(colorVal === color) ? 25 : 30,
                            // backgroundColor: 'rgba(0,0,0,0.1)',
                            backgroundColor: color,
                            marginRight: 10,
                            marginBottom: 10,
                            borderWidth: 1.5,
                            borderWidth: !(colorVal === color) ? 1 : 3,
                          }}></View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={{marginTop: 10}}>
                <FlatButton
                  title="FILTER"
                  disabled={!colorVal}
                  color={!colorVal ? 'gray' : '#2874F0'}
                  onPress={() => {
                    console.log('CLicked with color id of', colorVal);
                    setOpenColorModal(false);
                    Toast.show(
                      `Filtered List With ${colorVal} color`,
                      Toast.LONG,
                    );
                  }}
                />
              </View>
            </CustomModal>

            <TouchableWithoutFeedback
              onPress={() => {
                console.log('clicked on Palette');
                setOpenColorModal(true);
                setRecentClicked('Palette');
              }}>
              <View style={styles.bottomActionContentBox}>
                <FontAwesome5
                  name={'palette'}
                  color={recentClicked === 'Palette' ? 'blue' : 'black'}
                  solid
                  size={20}
                  style={{}}
                />
                <Text
                  style={{
                    color: recentClicked === 'Palette' ? 'blue' : 'black',
                  }}>
                  Color
                </Text>
              </View>
            </TouchableWithoutFeedback>

            {/****************  Cost Modal And Action Button **********************/}

            <CustomModal
              open={openCostModal}
              setOpen={setOpenCostModal}
              title="Select Cost Type"
              setClickedVal={setColorVal}>
              <View
                style={{
                  height: 130,
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginTop: 10,
                  paddingVertical: 5,
                }}>
                <ScrollView style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    {costType.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          console.log('Setting a color with id', type);
                          setCostVal(type);
                        }}>
                        <View
                          style={{
                            width: '90%',

                            backgroundColor:
                              costVal === type ? '#2874F0' : 'rgba(0,0,0,0.1)',
                            marginBottom: 10,
                            borderWidth: 1.5,
                            borderColor: '',
                          }}>
                          <Text
                            style={{
                              marginLeft: 10,
                              paddingVertical: 8,
                              fontSize: 15,
                              color: costVal === type ? 'white' : 'black',
                            }}>
                            {type}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={{marginTop: 10}}>
                <FlatButton
                  title="FILTER"
                  disabled={!costVal}
                  color={!costVal ? 'gray' : '#2874F0'}
                  onPress={() => {
                    console.log('Clicked on Cost of Type', costVal);
                    setOpenCostModal(false);
                    Toast.show(`Filtered List With ${costVal}`, Toast.LONG);
                  }}
                />
              </View>
            </CustomModal>

            <TouchableWithoutFeedback
              onPress={() => {
                console.log('clicked on Cost');
                setOpenCostModal(true);
                setRecentClicked('Cost');
              }}>
              <View style={styles.bottomActionContentBox}>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome5
                    name={'rupee-sign'}
                    color={recentClicked === 'Cost' ? 'blue' : 'black'}
                    solid
                    size={20}
                    style={{}}
                  />
                </View>

                <Text
                  style={{
                    color: recentClicked === 'Cost' ? 'blue' : 'black',
                  }}>
                  Cost
                </Text>
              </View>
            </TouchableWithoutFeedback>

            {/****************  Rating Action Button **********************/}

            <TouchableWithoutFeedback
              onPress={() => {
                console.log('clicked on Rating');
                setRecentClicked('Rating');
                Toast.show(
                  `Filtered List With High Rated Product At The Top`,
                  Toast.LONG,
                );
              }}>
              <View style={styles.bottomActionContentBox}>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome5
                    name={'star'}
                    color={recentClicked === 'Rating' ? 'blue' : 'black'}
                    solid
                    size={20}
                    style={{}}
                  />
                </View>
                <Text
                  style={{
                    color: recentClicked === 'Rating' ? 'blue' : 'black',
                  }}>
                  Rating
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'orange',
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
  bottomActionView: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomActionContent: {
    width: '95%',
    // backgroundColor: 'pink',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomActionContentBox: {
    width: '24%',
    height: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewProduct;
