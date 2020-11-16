import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomModal from '../shared/modal';
import FlatButton from '../shared/button';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {
  baseUrl,
  commonProducts,
  getAllCategories,
  getAllColors,
} from '../baseUrl';
import CustomChip from '../shared/chip';
import SomethingWrong from './somethingWentWrong';
import LoadingScreen from './loadingScreen';
import Card from '../shared/card';

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation,route} props  navigation is a object which is use to navigate between different screens. route is an object which contains category information if provided from home screen.
 * @description viewProduct screen shows all product which is availble in application. Also this screen contains various filtering options to filter products based on category,color, price, rating.
 * @return jsx which is used to display cards which contains product image, name, price, rating and some buttons to perform action.
 */

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
  const [error, setError] = useState('');

  const getCommonProduct = () => {
    axios
      .get(`${baseUrl}/${commonProducts}`, {
        params: {
          category_id: route.params ? route.params.category_id : '',
        },
      })
      .then((res) => {
        setCommonPro(res.data);
        setDisplayProducts(res.data.product_details.slice(0, 5));
        setIsLoading(false);
      })
      .catch((e) => {
        // console.log('Common Products Error ', e, e.response);
        setError('Something Went Wrong');
        setIsLoading(false);
      });
  };

  const getCategory = () => {
    axios
      .get(`${baseUrl}/${getAllCategories}`)
      .then((res) => {
        setCategories(res.data.category_details);
      })
      .catch((e) => {
        // console.log('Get All Category Error ', e, e.response);
      });
  };

  const getColor = () => {
    axios
      .get(`${baseUrl}/${getAllColors}`)
      .then((res) => {
        setColors(res.data.color_details);
      })
      .catch((e) => {
        // console.log('Get All Color Error ', e, e.response);
      });
  };

  const getFilteredProducts = (filteredOn, cateCode, colCode) => {
    let categoryId = '';
    let colorId = '';

    categoryId = cateCode;
    colorId = colCode;

    axios
      .get(`${baseUrl}/${commonProducts}`, {
        params: {
          category_id: categoryId,
          color_id: colorId,
        },
      })
      .then((res) => {
        if (res.data.message != 'No Product is available') {
          setCommonPro(res.data);
          setDisplayProducts(res.data.product_details.slice(0, 5));
          setBatch(1);
          Toast.show(`Filtered List With ${filteredOn}`, Toast.SHORT);
        } else {
          setCommonPro({});
          setDisplayProducts([]);
          setBatch(1);
        }
      })
      .catch((e) => {
        // console.log('Filter Products Error ', e, e.response);
        setCommonPro({});
        setDisplayProducts([]);
        setBatch(1);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    if (route.params?.category_id) {
      setCategoryVal(route.params.category_name);
      setCategoryCode(route.params.category_id);
    }

    getCommonProduct();

    getCategory();

    getColor();
  }, []);

  useEffect(() => {
    if (categoryCode) {
      getFilteredProducts('Category', categoryCode, '');
    }
  }, [categoryCode]);

  useEffect(() => {
    if (colorCode) {
      getFilteredProducts('Color', categoryCode, colorCode);
    }
  }, [colorCode]);

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
    Toast.show(`${end} OF ${commonPro.product_details.length}`, Toast.SHORT);
    setBatch((preState) => preState + 1);
  };

  const handleChipClose = (closedOn, cateCode, colCode) => {
    if (closedOn == 'Color') {
      setColorName('');
      setColorVal('');
      setColorCode('');
      setCostVal('');
      setRecentClicked('');
    } else {
      setCategoryCode('');
      setCategoryVal('');
      setCostVal('');
      setRecentClicked('');
    }

    axios
      .get(`${baseUrl}/${commonProducts}`, {
        params: {
          category_id: cateCode,
          color_id: colCode,
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
        // console.log('Chip Clicked Error ', e, e.response);
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

  if (error) {
    return <SomethingWrong />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View style={styles.chipContainer}>
              {categoryVal ? (
                <CustomChip
                  text={categoryVal}
                  onClick={() => {
                    handleChipClose('Category', '', colorCode);
                  }}
                />
              ) : null}
              {colorVal ? (
                <CustomChip
                  text={colorName}
                  color={colorVal}
                  onClick={() => {
                    handleChipClose('Color', categoryCode, '');
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
                var x = item.product_cost;
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
                    navigation={navigation}
                    index={index}
                    productId={item.product_id}
                    productName={item.product_name}
                    productCost={res}
                    productImage={item.product_image}
                    product={item}
                    rating={true}
                  />
                );
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
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
              <Text style={styles.noProductFoundText}>No Product Found</Text>
            </View>
          )}
        </View>

        {/****************  Category Modal And Action Button **********************/}

        <CustomModal
          open={openCategoryModal}
          setOpen={setOpenCategoryModal}
          title="Select Category"
          setClickedVal={() => {}}>
          <View style={styles.modalInnerContainer}>
            <ScrollView style={{flex: 1}}>
              <View style={styles.modalMainContent}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setCategoryVal(category.category_name);
                      setCategoryCode(category.category_id);
                      setColorVal('');
                      setColorCode('');
                      setCostVal('');
                      setOpenCategoryModal(false);
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
        </CustomModal>

        <View style={styles.bottomActionView}>
          <View style={styles.bottomActionContent}>
            <TouchableWithoutFeedback
              onPress={() => {
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
              setClickedVal={() => {}}>
              <View style={styles.modalInnerContainer}>
                <ScrollView style={{flex: 1}}>
                  <View style={styles.modalMainContent}>
                    {colors.map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setCostVal('');
                          setColorVal(color.color_code);
                          setColorCode(color.color_id);
                          setColorName(color.color_name);
                          setOpenColorModal(false);
                          // getFilteredProducts('Color', categoryCode, colorCode);
                        }}>
                        <View
                          style={{
                            width: !(colorVal === color.color_code) ? 45 : 50,
                            height: !(colorVal === color.color_code) ? 25 : 30,
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
                  ...styles.modalMainContent,
                  height: 120,
                }}>
                <ScrollView style={{flex: 1}}>
                  <View style={styles.modalMainContent}>
                    {costType.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setCostVal(type);
                          setOpenCostModal(false);
                          axios
                            .get(`${baseUrl}/${commonProducts}`, {
                              params: {
                                category_id: categoryCode,
                                color_id: colorCode,
                                sortBy: 'product_cost',
                                sortIn:
                                  type == 'Price: Low To High' ? false : true,
                              },
                            })
                            .then((res) => {
                              if (
                                res.data.message != 'No Product is available'
                              ) {
                                setCommonPro(res.data);
                                setDisplayProducts(
                                  res.data.product_details.slice(0, 5),
                                );
                                setBatch(1);
                                Toast.show(
                                  `Filtered List With ${type}`,
                                  Toast.SHORT,
                                );
                              } else {
                                setCommonPro({});
                                setDisplayProducts([]);
                                setBatch(1);
                              }
                            })
                            .catch((e) => {
                              setCommonPro({});
                              setDisplayProducts([]);
                              setBatch(1);
                            });
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
            </CustomModal>

            <TouchableWithoutFeedback
              onPress={() => {
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
                    // console.log('Filter With Rating Response ', res);
                    if (res.data.message != 'No Product is available') {
                      setCommonPro(res.data);
                      setDisplayProducts(res.data.product_details.slice(0, 5));
                      setBatch(1);
                      Toast.show(
                        `Filtered List With High Rated Product At The Top`,
                        Toast.SHORT,
                      );
                    } else {
                      setCommonPro({});
                      setDisplayProducts([]);

                      setBatch(1);
                    }
                  })
                  .catch((e) => {
                    // console.log('Filter With Rating Error ', e, e.response);
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomActionContentBox: {
    width: '24%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProductFoundText: {
    fontSize: 20,
    marginTop: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.9,
  },

  chipContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  productInfoWrapper: {
    flex: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  modalInnerContainer: {
    height: 140,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    paddingVertical: 5,
  },

  modalMainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ViewProduct;
