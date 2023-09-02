import com.alibaba.druid.pool.DruidDataSourceFactory;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.HashMap;
import java.util.Properties;

public class Druid {
    public static HashMap userMap = new HashMap();
    public static HashMap articleMap = new HashMap();
    public static HashMap actionMap = new HashMap();
    public static Properties p;
    public static InputStream is;
    public static DataSource createDataSource;
    public static Connection connection;
    static {
        p = new Properties();
        is = Druid.class.getClassLoader().getResourceAsStream("jdbc.properties");
        try {
            p.load(is);
            createDataSource = DruidDataSourceFactory.createDataSource(p);
            connection = createDataSource.getConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    public static void getDruid(String str) {
        try {

            if (str.length() != 0) {
                PreparedStatement preparedStatement = connection.prepareStatement(str);
                preparedStatement.executeUpdate();
            }
            PreparedStatement preparedStatement1 = connection.prepareStatement("select * from user");
            ResultSet resultSet1 = preparedStatement1.executeQuery();
            User user;
            int id;
            String n, psw, t, g, b, e, s;
            userMap.clear();
            while (resultSet1.next()) {
                id = resultSet1.getInt("Uid");
                n = resultSet1.getString("name");
                psw = resultSet1.getString("password");
                t = resultSet1.getString("type");
                g = resultSet1.getString("gender");
                b = resultSet1.getString("birthday");
                e = resultSet1.getString("email");
                s = resultSet1.getString("signature");
                user = new User(id, n, psw, t, g, b, e, s);
                userMap.put(id+"", user);
//                System.out.println(id+"   "+ n+' '+ psw+' '+t+' '+ g+' '+b+' '+ e+' '+ s);
            }

            PreparedStatement preparedStatement2 = connection.prepareStatement("select * from article");
            ResultSet resultSet2 = preparedStatement2.executeQuery();
            Article article;
            int Aid,authorId;
            int number=0;
            String title, authorName, Atype, content, time;
            articleMap.clear();
            while (resultSet2.next()) {
                number += 1;
                Aid = resultSet2.getInt("Aid");
                authorId = resultSet2.getInt("authorId");
                title = resultSet2.getString("title");
                authorName = resultSet2.getString("authorName");
                Atype = resultSet2.getString("Atype");
                content = resultSet2.getString("content");
                time = resultSet2.getString("time");
                article = new Article(Aid,authorId,number,title,authorName,Atype,content,time);
                articleMap.put(number+"",article);
//                System.out.println(Aid+"   "+ authorId+' '+title+' '+authorName+' '+ Atype+' '+content+' '+ time);
            }

            PreparedStatement preparedStatement3 = connection.prepareStatement("select * from action");
            ResultSet resultSet3 = preparedStatement3.executeQuery();
            Action action;
            int Uid;
            number=0;
            String Ctype;
            actionMap.clear();
            while (resultSet3.next()) {
                number++;
                Uid = resultSet3.getInt("Uid");
                id = resultSet3.getInt("id");
                Ctype = resultSet3.getString("Ctype");
                action = new Action(Uid,id,number,Ctype);
                actionMap.put(number+"",action);
//                System.out.println(Uid+"   "+ id+' '+ Ctype);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}