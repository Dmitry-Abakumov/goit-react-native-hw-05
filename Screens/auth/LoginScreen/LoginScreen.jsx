import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import BgImgWrapper from "../../../shared/components/BgImgWrapper";
import FormBtn from "../../../shared/components/FormBtn";
import TextField from "../../../shared/components/TextFIeld";

import useKeyboard from "../../../shared/hooks/useKeyboard";
import useForm from "../../../shared/hooks/useForm";
import formProps from "./formProps";

import { signIn } from "../../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ isKeyboardShow, navigation }) => {
  const { fields, setFields, onSubmit } = useForm(initialState);
  const dispatch = useDispatch();

  const onLoginFormSubmit = () => {
    dispatch(signIn(fields));
    onSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <BgImgWrapper />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View
            style={{
              ...styles.formWrapper,
              paddingBottom: isKeyboardShow ? 32 : 144,
            }}
          >
            <Text style={styles.formTitle}>Войти</Text>
            <TextField
              onChangeText={(text) =>
                setFields((prevFields) => ({ ...prevFields, email: text }))
              }
              value={fields.email}
              {...formProps.email}
            />
            <View style={styles.passwordWrapper}>
              <TextField
                onChangeText={(text) =>
                  setFields((prevFields) => ({
                    ...prevFields,
                    password: text,
                  }))
                }
                value={fields.password}
                {...formProps.password}
              />
              {/* <TouchableOpacity style={styles.passwordBtn}>
          <Text style={styles.passwordBtnText}>Показать</Text>
        </TouchableOpacity> */}
            </View>
            {!isKeyboardShow && (
              <FormBtn onSubmit={onLoginFormSubmit}>Войти</FormBtn>
            )}

            {!isKeyboardShow && (
              <TouchableOpacity
                style={styles.loginRedirectLink}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.loginRedirectText}>
                  Нет аккуаунта? зарегистрироваться
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  formTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#212121",
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  passwordBtn: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  passwordBtnText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },

  loginRedirectLink: {
    marginTop: 16,
  },
  loginRedirectText: {
    color: "#1B4371",
  },
});
