package com.example.demo;

import com.example.demo.entity.User;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

public class UserUtils {

    public static List<User> fetchUsersAndPostsFromJsonPlaceholder() throws IOException, ClassNotFoundException {
        List<User> populatedUsers = new ArrayList<>();

        ClassPathResource classPathResource = new ClassPathResource("users.txt");
        try (ObjectInputStream objectInputStream = new ObjectInputStream(classPathResource.getInputStream());
        ) {
            populatedUsers = (List<User>) objectInputStream.readObject();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return populatedUsers;
    }
}
