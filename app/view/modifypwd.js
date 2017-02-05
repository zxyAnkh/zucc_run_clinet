/**
 * modify user password page
**/
'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  ToastAndroid,
  Animated
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import * as Storage from '../common/storage';
import {update} from '../service/userService';

export default class ModifyPwdView extends React.Component{
  	constructor(props){
  		super(props);
      this.state = {
        no: '',
        oldpwd: '',
        newpwd1: '',
        newpwd2: ''
      };
  	}

  	componentDidMount() {
    	Storage.get('user').then(ret => {
        this.state.no = ret.no;
      })
  	}

  	componentWillUnMount() {

  	}

  	backToSetting(){
  		this.props.navigator.pop();
  	}

  	modify(){
      let {no, oldpwd, newpwd1, newpwd2} = this.state;
      if(newpwd1 === newpwd2 && oldpwd !== newpwd1){
        Storage.get('user').then(ret => {
          if(ret.password === oldpwd){      
            if(update(no, newpwd1)){
              Storage.set('user', {'no': no, 'password': newpwd1}, 1000 * 3600 * 24 * 7);
              Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
              ToastAndroid.show('修改成功，请重新登录.', ToastAndroid.SHORT);
              this.props.navigator.replace({id: 'login'});
            }
          }
        })
      }
  	}

  _onChangeOldPwd(text){
    this.state.oldpwd = text;
  }

  _onChangeNewPwd1(text){
    this.state.newpwd1 = text;
  }

  _onChangeNewPwd2(text){
    this.state.newpwd2 = text;
  }

  	render(){
  		return (
  			<View>
	  			<NavigationBar
	          		title={{title:'修改密码'}}
	          		leftButton={{      
	            		title: '返回',
	            		handler: () => this.backToSetting(),
	  				}}
	          		style={styles.topNav}
        		/>
        		<View style={styles.inputContainer}>
		          <TextInput
		            ref="no"
		            style={styles.inputs}
		            placeholder="please input your old password"
		            keyboardType="default"
		            clearButtonMode="while-editing"
		            returnKeyType="next"
                onChangeText={this._onChangeOldPwd.bind(this)}
		          />
		          <View style={styles.line}></View>
		          <TextInput
		            ref="pwdInput"
		            style={styles.inputs}
		            password="true"
		            secureTextEntry={true}
		            placeholder="please input your new password"
		            clearButtonMode="while-editing"
		            returnKeyType="done"
                onChangeText={this._onChangeNewPwd1.bind(this)}
		          />
		          <View style={styles.line}></View>
		          <TextInput
		            ref="pwdInput"
		            style={styles.inputs}
		            password="true"
		            secureTextEntry={true}
		            placeholder="please input your new password again"
		            clearButtonMode="while-editing"
		            returnKeyType="done"
                onChangeText={this._onChangeNewPwd2.bind(this)}
		          />
		        </View>
		        <View style={styles.buttonGroup}>
		          <TouchableOpacity onPress={this.modify.bind(this)}>
		            <View style={styles.Login}>
		              <Text style={styles.LoginText}>确认修改</Text>
		            </View>
		          </TouchableOpacity>
		        </View>
  			</View>
  			);
  	}
}

var styles = StyleSheet.create({
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    backgroundColor: '#f0ffff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  inputs: {
    height: 40,
    fontSize: 14,
    padding: 10,
  },
  line: {
    height:0.5,
    backgroundColor: '#ccc',
  },
  buttonGroup: {
    marginTop: 30,
  },
  Login: {
    alignItems: 'center',
    height: 40,
    backgroundColor: '#0379d5',
  },
  LoginText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
})