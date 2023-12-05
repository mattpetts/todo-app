import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

import Ideas from './screens/Ideas';
import New from './screens/New';

const Tab = createBottomTabNavigator();

const App = () => {

  const [data, setData] = useState([]);
  const [todo, setTodo] = useState([]);
  const [archived, setArchived] = useState([]);

  const toggleCompleted = (id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setData(newData);
  };

  useEffect(() => {
    const newTodo = [];
    const newArchived = [];

    data.forEach((item) => {
      if (item.completed) {
        newArchived.push(item);
      } else {
        newTodo.push(item);
      }
    });

    setTodo(newTodo);
    setArchived(newArchived);

  }, [data]);

  const addItem = (val) => {
    setData([{"id": uuid.v4(), "title": val, "completed": false, "date": new Date().toISOString()}, ...data]);
  };

  const deleteItem = (id) => {
    setData(data => data.filter(obj => obj.id !== id))
  }

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          headerShown: false,
          tabBarStyle: {
            borderRadius: 10,
            backgroundColor: '#455d7a',
            margin: 5,
            marginBottom: 15,
            position: 'absolute',
            height: 60,
            border: 0,
            borderColor: '#455d7a'
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#e3e3e3',
          tabBarActiveTintColor: '#f95959',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent'
        }}
      >
        <Tab.Screen 
          name="Ideas" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-list" color={color} size={size} />
            ),
          }}
        >
          {(props) => <Ideas {...props} data={{archived, todo}} handleToggleCompleted={(id) => toggleCompleted(id)} handleDeleteItem={(id) => deleteItem(id)} />}
        </Tab.Screen>
        <Tab.Screen 
          name="Add New"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add" color={color} size={size} />
            ),
          }}
        >
          {(props) => <New {...props} handleAddItem={(val) => addItem(val)} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
