
import net.sf.json.JSONObject;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
@WebServlet("/ajax4")
public class Ajax4 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String id = json.getString("id");
        String type = json.getString("type");
        Druid druid = new Druid();
        String sql;
        if(type.equals("get")){
            druid.getDruid("");
            User user = (User) Druid.userMap.get(id);
            JSONObject jsonObject = JSONObject.fromObject(user);
            out.print(jsonObject.toString());
        } else if(type.equals("edit")){
            String name = json.getString("name");
            String email = json.getString("email");
            String gender = json.getString("gender");
            String birthday = json.getString("birthday");
            String sign = json.getString("sign");
            String password = json.getString("password");
            sql = "update user set `name`='"+name+ "',email='"+email+ "',`gender`='"+gender+ "',birthday='"+birthday+ "',signature='"+sign+ "',password='"+password+ "' where Uid="+id;
            druid.getDruid(sql);
            out.print("修改成功");
        } else if (type.equals("delete")) {
            sql = "delete from user where Uid="+id;
            druid.getDruid(sql);
            out.write("注销成功");
        }
    }
}

