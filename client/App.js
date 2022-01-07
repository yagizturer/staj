import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import info from "./info.json";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`${info["server"]}/check_session`).then(res => res.json()).then(data => {
      if (data.success) {
        setUser({ user_type: data.user_type, username: data.username, id: data.id })
      }
    }).catch(console.log).finally(() => setLoading(false))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {
        user ? <LoggedIn user={user} setUser={setUser} setLoading={setLoading} />
          : <LoggedOut setUser={setUser} setLoading={setLoading} />
      }
      {loading && <View style={styles.loadingContainer}>
        <ActivityIndicator color="black" size="large" />
      </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
