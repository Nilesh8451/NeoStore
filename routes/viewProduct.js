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
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {
  baseUrl,
  commonProducts,
  getAllCategories,
  getAllColors,
} from '../baseUrl';
import CustomChip from '../shared/chip';

function ViewProduct({navigation, route}) {
  const [commonPro, setCommonPro] = useState({});
  const [displayProducts, setDisplayProducts] = useState([]);
  const [batch, setBatch] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [recentClicked, setRecentClicked] = useState('');
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);
  const [colorVal, setColorVal] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [costVal, setCostVal] = useState('');
  const [colors, setColors] = useState([]);
  const [colorCode, setColorCode] = useState('');
  const [colorName, setColorName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');

  const [categories, setCategories] = useState([]);

  const [costType, setCostType] = useState([
    'Price: Low To High',
    'Price: High To Low',
  ]);

  useEffect(() => {
    setIsLoading(true);
    console.log(route.params);
    if (route.params?.category_id) {
      setCategoryVal(route.params.category_name);
      setCategoryCode(route.params.category_id);
    }

    axios
      .get(`${baseUrl}/${commonProducts}`, {
        params: {
          category_id: route.params ? route.params.category_id : '',
        },
      })
      .then((res) => {
        console.log('Res On Common Pro', res.data);
        setCommonPro(res.data);
        setDisplayProducts(res.data.product_details.slice(0, 5));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('Error on Common Products', e, e.response);
        setIsLoading(false);
      });

    axios
      .get(`${baseUrl}/${getAllCategories}`)
      .then((res) => {
        console.log('Category', res);
        setCategories(res.data.category_details);
      })
      .catch((e) => {
        console.log('Error Cate', e, e.response);
      });

    axios
      .get(`${baseUrl}/${getAllColors}`)
      .then((res) => {
        console.log('Color', res);
        setColors(res.data.color_details);
      })
      .catch((e) => {
        console.log('Error Col', e, e.response);
      });
  }, []);

  const loadMore = () => {
    let start = batch * 5;
    let end = (batch + 1) * 5;

    if (end > commonPro.product_details.length) {
      end = commonPro.product_details.length;
    }
    const newData = commonPro.product_details.slice(start, end);
    setDisplayProducts((prevState) => {
      return [...prevState, ...newData];
    });
    Toast.show(`${end} OF ${commonPro.product_details.length}`, Toast.LONG);
    setBatch((preState) => preState + 1);
  };

  const handleSelectedCategoryClose = () => {
    axios
      .get(`${baseUrl}/${commonProducts}`, {
        params: {
          color_id: colorCode,
        },
      })
      .then((res) => {
        if (res.data.message != 'No Product is available') {
          setCommonPro(res.data);
          setDisplayProducts(res.data.product_details.slice(0, 5));
          setBatch(1);
        } else {
          setCommonPro({});
          setDisplayProducts([]);
        }
      })
      .catch((e) => {
        console.log('Cate Filter Error', e, e.response);
        setCommonPro({});
        setDisplayProducts([]);
      });
    setCategoryCode('');
    setCategoryVal('');
  };

  const handleSelectedColorClose = () => {
    setColorName('');
    setColorVal('');
    setColorCode('');
    axios
      .get(`${baseUrl}/${commonProducts}`, {
        params: {
          category_id: categoryCode,
          color_id: '',
          sortBy: costVal ? 'product_cost' : '',
          sortIn: costVal
            ? costVal == 'Price: Low To High'
              ? false
              : true
            : '',
        },
      })
      .then((res) => {
        if (res.data.message != 'No Product is available') {
          setCommonPro(res.data);
          setDisplayProducts(res.data.product_details.slice(0, 5));
          setBatch(1);
        } else {
          setCommonPro({});
          setDisplayProducts([]);
        }
      })
      .catch((e) => {
        console.log('Cate Filter Error', e, e.response);
        setCommonPro({});
        setDisplayProducts([]);
      });
  };

  const renderFlatlistFooter = () => {
    return !(displayProducts.length === commonPro?.product_details?.length) ? (
      <View>
        <ActivityIndicator animating size="large" color={'blue'} />
      </View>
    ) : (
      <View></View>
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
          <View
            style={{
              // backgroundColor: 'yellow',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                // backgroundColor: 'pink',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              {categoryVal ? (
                <CustomChip
                  text={categoryVal}
                  onClick={() => {
                    handleSelectedCategoryClose();
                  }}
                />
              ) : null}
              {colorVal ? (
                <CustomChip
                  text={colorName}
                  color={colorVal}
                  onClick={() => {
                    handleSelectedColorClose();
                  }}
                />
              ) : null}
            </View>
          </View>
          {displayProducts.length > 0 ? (
            <FlatList
              data={displayProducts}
              keyExtractor={(item) => item._id}
              onEndReached={loadMore}
              ListFooterComponent={renderFlatlistFooter}
              onEndReachedThreshold={1}
              renderItem={({item, index}) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      console.log('Clicked on Card');
                      navigation.navigate('ProductDetail', {
                        product_name: item.product_name,
                        product_id: item.product_id,
                      });
                    }}>
                    <View style={styles.productCardContent}>
                      <View style={styles.productCard}>
                        <ImageBackground
                          source={{
                            uri: `${baseUrl}/${item.product_image}`,
                          }}
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
                                alignItems:
                                  index % 2 ? 'flex-start' : 'flex-end',
                                maxWidth: 200,
                              }}>
                              <Text
                                style={{fontSize: 21, color: 'white'}}
                                numberOfLines={1}>
                                {item.product_name}
                              </Text>
                              <Rating
                                ratingCount={5}
                                startingValue={parseFloat(item.product_rating)}
                                imageSize={20}
                                type={'custom'}
                                readonly={true}
                                tintColor="rgba( 0, 0, 0, 0.5 )"
                              />
                              <Text style={{fontSize: 15, color: 'white'}}>
                                {item.product_cost}
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
          ) : (
            <View
              style={{
                flex: 1,
                // backgroundColor: 'yellow',
                alignItems: 'center',
                paddingTop: 80,
              }}>
              <FontAwesome5
                name={'exclamation-circle'}
                color={'red'}
                solid
                size={90}
                style={{opacity: 0.5}}
                onPress={() => {}}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  opacity: 0.9,
                }}>
                No Product Found
              </Text>
            </View>
          )}
        </View>

        {/****************  Category Modal And Action Button **********************/}

        <CustomModal
          open={openCategoryModal}
          setOpen={setOpenCategoryModal}
          title="Select Category"
          setClickedVal={handleSelectedCategoryClose}>
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
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      console.log(
                        'Setting a color with id',
                        category.category_id,
                      );
                      setCategoryVal(category.category_name);
                      setCategoryCode(category.category_id);
                    }}>
                    <View
                      style={{
                        width: '90%',

                        backgroundColor:
                          categoryVal === category.category_name
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
                          color:
                            categoryVal === category.category_name
                              ? 'white'
                              : 'black',
                        }}>
                        {category.category_name}
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
                setColorCode('');
                setCostVal('');
                setOpenCategoryModal(false);

                axios
                  .get(`${baseUrl}/${commonProducts}`, {
                    params: {
                      category_id: categoryCode,
                    },
                  })
                  .then((res) => {
                    // console.log('AAAAAAAAAAAAAAAA', res);
                    setCommonPro(res.data);
                    setDisplayProducts(res.data.product_details.slice(0, 5));
                    setBatch(1);
                    Toast.show(
                      `Filtered List With ${categoryVal} category`,
                      Toast.LONG,
                    );
                  })
                  .catch((e) => {
                    console.log('Cate Filter Error', e, e.response);
                  });
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
              setClickedVal={handleSelectedColorClose}>
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
                    {colors.map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          console.log(
                            'Setting a color with colorCode',
                            color.color_code,
                            color,
                          );
                          setCostVal('');
                          setColorVal(color.color_code);
                          setColorCode(color.color_id);
                          setColorName(color.color_name);
                        }}>
                        <View
                          style={{
                            width: !(colorVal === color.color_code) ? 45 : 50,
                            height: !(colorVal === color.color_code) ? 25 : 30,
                            // backgroundColor: 'rgba(0,0,0,0.1)',
                            backgroundColor: color.color_code,
                            marginRight: 10,
                            marginBottom: 10,
                            borderWidth: 1.5,
                            borderWidth: !(colorVal === color.color_code)
                              ? 1
                              : 3,
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

                    axios
                      .get(`${baseUrl}/${commonProducts}`, {
                        params: {
                          category_id: categoryCode,
                          color_id: colorCode,
                        },
                      })
                      .then((res) => {
                        // console.log('Color res with ', res);
                        if (res.data.message != 'No Product is available') {
                          setCommonPro(res.data);
                          setDisplayProducts(
                            res.data.product_details.slice(0, 5),
                          );
                          setBatch(1);
                          Toast.show(
                            `Filtered List With ${colorVal} color`,
                            Toast.LONG,
                          );
                        } else {
                          setCommonPro({});
                          setDisplayProducts([]);
                          setBatch(1);
                        }
                      })
                      .catch((e) => {
                        console.log('Cate Filter Error', e, e.response);
                        setCommonPro({});
                        setDisplayProducts([]);
                        setBatch(1);
                      });
                  }}
                />
              </View>
            </CustomModal>

            <TouchableWithoutFeedback
              onPress={() => {
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
              setClickedVal={setCostVal}
              setClickedCode={() => {}}>
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
                    axios
                      .get(`${baseUrl}/${commonProducts}`, {
                        params: {
                          category_id: categoryCode,
                          color_id: colorCode,
                          sortBy: 'product_cost',
                          sortIn:
                            costVal == 'Price: Low To High' ? false : true,
                        },
                      })
                      .then((res) => {
                        console.log('Cost res with ', res);
                        if (res.data.message != 'No Product is available') {
                          setCommonPro(res.data);
                          setDisplayProducts(
                            res.data.product_details.slice(0, 5),
                          );
                          setBatch(1);
                          Toast.show(
                            `Filtered List With ${colorVal} color`,
                            Toast.LONG,
                          );
                        } else {
                          setCommonPro({});
                          setDisplayProducts([]);
                          console.log('Successfully Cleared');
                          setBatch(1);
                        }
                      })
                      .catch((e) => {
                        console.log('Cate Filter Error', e, e.response);
                        setCommonPro({});
                        setDisplayProducts([]);
                        console.log('Successfully Cleared');
                        setBatch(1);
                      });
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

                axios
                  .get(`${baseUrl}/${commonProducts}`, {
                    params: {
                      category_id: categoryCode,
                      color_id: colorCode,
                      sortBy: 'product_rating',
                      sortIn: true,
                    },
                  })
                  .then((res) => {
                    // console.log('Rate res with ', res);
                    if (res.data.message != 'No Product is available') {
                      setCommonPro(res.data);
                      setDisplayProducts(res.data.product_details.slice(0, 5));
                      setBatch(1);
                      Toast.show(
                        `Filtered List With High Rated Product At The Top`,
                        Toast.LONG,
                      );
                    } else {
                      setCommonPro({});
                      setDisplayProducts([]);

                      setBatch(1);
                    }
                  })
                  .catch((e) => {
                    console.log('Rate Filter Error', e, e.response);
                    setCommonPro({});
                    setDisplayProducts([]);
                    setBatch(1);
                  });
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
