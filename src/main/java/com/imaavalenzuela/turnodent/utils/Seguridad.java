package com.imaavalenzuela.turnodent.utils;

import org.mindrot.jbcrypt.BCrypt;

public class Seguridad {
    public static String hashPassword(String plainTextPassword){
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }
    
    public static boolean verificarPassword(String plainTextPassword, String hashedPassword){
        return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }
}
