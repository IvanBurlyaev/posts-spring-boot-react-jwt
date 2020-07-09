package com.example.demo;

import com.example.demo.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

public class UserUtils {

    private static final Logger logger = LoggerFactory.getLogger(UserUtils.class);

    private UserUtils() {
    }

    public static List<User> fetchUsersAndPostsFromJsonPlaceholder() throws IOException, ClassNotFoundException {
        List<User> populatedUsers = new ArrayList<>();

        ClassPathResource classPathResource = new ClassPathResource("users.txt");
        try (ObjectInputStream objectInputStream = new ObjectInputStream(classPathResource.getInputStream());
        ) {
            populatedUsers = (List<User>) objectInputStream.readObject();
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            throw ex;
        }
        return populatedUsers;
    }
}
