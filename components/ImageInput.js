import { Box, Button, Center, HStack, IconButton, Image, Pressable, View } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ImageInput({ initValue = '', onChange, ...props }) {
    const [image, setImage] = useState(initValue);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [3, 3],
            quality: 0.5,
        });

        // console.log(result);

        if (!result.canceled) {
            const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
            setImage(base64);
            onChange(base64);
        }
    };

    function handleResetImage() {
        setImage(initValue);
        onChange(initValue);
    }

    return (

        <Box  borderRadius={100}  position="relative" w={210} h="210"  rounded={0} overflow="hidden" {...props}>
            <Pressable borderRadius={100} onPress={pickImage}>
                {image ? (
                    <Image borderRadius={100} alt="" src={image}  h="200" w="200" />
                ) : (
                    <Center borderRadius={100} bg="gray.200"  h="full" w="full">
                        <MaterialCommunityIcons name="file-image-plus-outline" size={40} color="black" />
                    </Center>
                )}
            </Pressable>

            {image && (
                <IconButton 
                    position="absolute"
                    right="0"
                    top="-15"
                    rounded="full"
                    py="3"
                    onPress={handleResetImage}
                    icon={<Ionicons name="close" size={24} color="#f4a261"/>}
                />
            )}
        </Box>

    );
}
