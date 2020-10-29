import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Profile(props) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.accountHolderInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              rounded
              size={70}
              source={{
                uri:
                  'data:image/jpeg;base64,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',
              }}
            />
            <Text style={{marginLeft: 25, fontSize: 19}}>Nilesh Chavan</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              marginLeft: 5,
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'phone-alt'}
              color={'black'}
              // backgroundColor="black"
              solid
              size={18}
              style={{opacity: 0.6}}
              onPress={() => {}}
            />
            <Text style={{marginLeft: 18, fontSize: 16}}>8451834334</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginLeft: 5,
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'envelope'}
              color={'black'}
              // backgroundColor="black"
              solid
              size={18}
              style={{opacity: 0.6}}
              onPress={() => {}}
            />
            <Text style={{marginLeft: 18, fontSize: 16}}>
              nileshchavan@neosoftmail.com
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            // backgroundColor: 'red',
            height: 75,
            borderTopWidth: 0.4,
            borderBottomWidth: 0.4,
            borderTopColor: 'gray',
            borderBottomColor: 'gray',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 0.4,
              borderRightColor: 'gray',
              height: '100%',
              width: '50%',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>₹0</Text>
            <Text style={{fontSize: 17}}>Wallet</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '50%',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>0</Text>
            <Text style={{fontSize: 17}}>Orders</Text>
          </View>
        </View>
        <View style={{marginTop: 18, marginBottom: 30}}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                // backgroundColor: 'yellow',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2874F0',
                  borderRadius: 20,
                }}>
                <FontAwesome5
                  name={'first-order'}
                  color={'black'}
                  solid
                  size={25}
                  style={{
                    opacity: 0.9,
                    color: 'white',
                  }}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>My Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ChangePassword')}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                // backgroundColor: 'yellow',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2874F0',
                  borderRadius: 20,
                }}>
                <FontAwesome5
                  name={'lock'}
                  color={'black'}
                  solid
                  size={25}
                  style={{
                    opacity: 0.9,
                    color: 'white',
                  }}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddAddress')}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                //   backgroundColor: 'yellow',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2874F0',
                  borderRadius: 20,
                }}>
                <FontAwesome5
                  name={'address-card'}
                  color={'black'}
                  solid
                  size={25}
                  style={{
                    opacity: 0.9,
                    color: 'white',
                  }}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>
                Add New Address
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('UpdateAddress')}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                //   backgroundColor: 'yellow',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2874F0',
                  borderRadius: 20,
                }}>
                <FontAwesome5
                  name={'address-card'}
                  color={'black'}
                  solid
                  size={25}
                  style={{
                    opacity: 0.9,
                    color: 'white',
                  }}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>Update Address</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  accountHolderInfo: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 20,
    // backgroundColor: 'yellow',
  },
});

export default Profile;
