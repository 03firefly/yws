import net.sf.json.JSONObject;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/ajax3")
public class Ajax3 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String id = json.getString("id");
        String type = json.getString("type");
        char[] ch;
        int n = 0;
        boolean bl=false;
        Druid druid = new Druid();
        druid.getDruid("");
        if(!id.equals("")){
            ch = id.toCharArray();
            bl = Druid.userMap.containsKey(id);
            for (int i = 0; i < id.length(); i++)
                if (ch[i] >= '0' && ch[i] <= '9') n++;
        }
        if(type.equals("id")) {
            if (!id.equals("")) {
                User user = (User) Druid.userMap.get(id);
                if (n == id.length() && bl) {
                    out.write(user.getType());
                } else {
                    out.write("账号不存在");
                }
            } else out.write("请输入");
        } else if (type.equals("password")) {
            String psw = json.getString("password");
            if(!id.equals("")) {
                if (n == id.length() && bl) {
                    User user = (User) Druid.userMap.get(id);
                    if (psw.length()==0) {
                        out.write("请输入");
                    }else if (user.getPassword().equals(psw)) {
                        out.write("");
                    } else {
                        out.write("密码不正确");
                    }
                }
            } else if (psw.length() == 0) {
                out.write("请输入");
            }
        } else if (type.equals("find")) {
            //String email = request.getParameter("email");
            String email = json.getString("email");
            User user = (User) Druid.userMap.get(id);
            if (user.getEmail().equals(email)) {
                out.write(user.getPassword());
            }else {
                out.write("邮箱不匹配");
            }
        }
    }
}