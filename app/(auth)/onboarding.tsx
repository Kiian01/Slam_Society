import { AuthColors, AuthFonts } from "@/constants/authTheme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Onboarding() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const linkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(linkOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[AuthColors.gradientTop, AuthColors.gradientBottom]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoCircle,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={{ opacity: taglineOpacity }}>
          <Text style={styles.title}>Find Your People,</Text>
          <Text style={styles.title}>Life's Better Together</Text>
        </Animated.View>
      </View>

      <Animated.View style={{ opacity: buttonOpacity, width: "100%" }}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push("/register")}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ opacity: linkOpacity }}>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLinkText}>
            Already have an account?{" "}
            <Text style={styles.loginLinkBold}>Log in here</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: AuthColors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoImage: { width: 72, height: 72 },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: AuthFonts.heading,
    color: AuthColors.primary,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: AuthColors.white,
    borderWidth: 1,
    borderColor: AuthColors.text,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: AuthFonts.medium,
    color: AuthColors.text,
  },
  loginLinkText: {
    textAlign: 'center',
    color: AuthColors.subtleText,
    fontSize: 13,
    fontFamily: AuthFonts.regular,
  },
  loginLinkBold: { color: AuthColors.primary, fontWeight: '700', fontFamily: AuthFonts.bold },
});
