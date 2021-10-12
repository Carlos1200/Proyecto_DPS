import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext, ThemeProvider } from "./src/context/theme/ThemeContext";
import { AuthNavigation } from "./src/navigator/AuthNavigation";
import { AuthProvider } from "./src/context/auth/AuthContext";

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <AppState>
        <AuthNavigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
