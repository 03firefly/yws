import net.sf.json.JSONObject;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/ajax2")
public class Ajax2 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String type = json.getString("type");
        if (type.equals("name")) {
            String name = json.getString("name");
            if(name.length() == 0)
                out.write("请输入");
            else out.write("");
        } else if (type.equals("password")) {
            String psw = json.getString("password");
            if (psw.length() == 0) {
                out.write("请输入");
            } else {
                char[] ch = psw.toCharArray();
                int n = 0, m = 0, l = 0;
                for (int i = 0; i < psw.length(); i++) {
                    if (ch[i] >= '0' && ch[i] <= '9') n++;
                    else if (ch[i] >= 'a' && ch[i] <= 'z') m++;
                    else if (ch[i] >= 'A' && ch[i] <= 'Z') l++;
                }
                if ((n + m + l) == psw.length())
                    out.write("");
                else out.write("请填写数字或字母");
            }
        }else if (type.equals("email")) {
            String em = json.getString("email");
            if (em.length() != 0) {
                int i = em.indexOf("@");
                int j = em.indexOf(".");
                if (i == -1 || j == -1)
                    out.write("该邮箱不合法");
                else out.write("");
            } else out.write("请输入");
        }else if (type.equals("birthday")) {
            String bd = json.getString("birthday");
            if (bd.length() != 0) {
                int n = 0,m = 0;
                char[] ch = bd.toCharArray();
                for(int i=0;i<bd.length();i++){
                    if(ch[i]>='0'&&ch[i]<='9')
                        n++;
                    else if (ch[i] == '-') {
                        m++;
                    }
                }
                if (n==(bd.length()-2) && m==2){
                    int year = Integer.parseInt(bd.split("-")[0]);
                    int month = Integer.parseInt(bd.split("-")[1]);
                    int day = Integer.parseInt(bd.split("-")[2]);
                    int[] days = {31,28,31,30,31,30,31,31,30,31,30,31};
                    if (month >= 1 && month <= 12){
                        if ((year % 100 == 0 && year % 400 == 0) || year % 4 == 0){
                            if (month == 2 && day <= 29)
                                out.write("");
                            else {
                                if (day <= days[month-1])
                                    out.write("");
                                else
                                    out.write("格式错误");
                            }
                        }else {
                            if (day <= days[month-1])
                                out.write("");
                            else
                                out.write("格式错误");
                        }
                    }else
                        out.write("格式错误");
                }
                else
                    out.write("格式错误");
            }
        }
    }
}