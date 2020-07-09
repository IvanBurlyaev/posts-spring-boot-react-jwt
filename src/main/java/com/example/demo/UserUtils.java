package com.example.demo;

import com.example.demo.entity.User;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

public class UserUtils {

    public static List<User> fetchUsersAndPostsFromJsonPlaceholder() throws IOException, ClassNotFoundException {
        List<User> populatedUsers = new ArrayList<>();

        try (FileInputStream fileInputStream = new FileInputStream(new File("src/main/resources/users.txt"));
             ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);) {
            populatedUsers = (List<User>) objectInputStream.readObject();
        }
        return populatedUsers;
    }
}
