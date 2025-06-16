package com.imaavalenzuela.turnodent.utils;

import org.mindrot.jbcrypt.BCrypt;

public class Seguridad {
    public static String hashPassword(String plainTextPassword){
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }
}
