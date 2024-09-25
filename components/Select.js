import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants'; 

const Select = ({ label, Value, onValueChange }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const options = ["Pet Shop", "Dono de Pet"]; 

    const handleSelect = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectContainer}>
                <Text style={styles.Value}>{Value || "Selecione seu Tipo"}</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.darkOne,
    fontWeight: "900",
    textAlign: "left",
    fontSize: SIZES.subtitle,
    paddingLeft: 10,
  },
  selectContainer: {
    minWidth: 200,               
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 10,                 
    borderWidth: 2,
    borderColor: COLORS.primary,
    minHeight: 60,
  },
  Value: {
    color: COLORS.dark,
    fontSize: SIZES.subtitle,               
    textTransform: "lowercase", 
    textAlign: 'center',        
    width: '100%',              
    fontWeight: '300',          
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.primary,
  },
});

export default Select;