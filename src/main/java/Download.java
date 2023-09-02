import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import net.sf.json.JSONObject;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
@WebServlet("/download")
public class Download extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String key = json.getString("key");
        System.out.println(key);
        Druid druid = new Druid();
        druid.getDruid("");
        Article article;
        article = (Article) Druid.articleMap.get(key);
        try {
            WritableWorkbook wwb = null;
            String fileName = "D:/yws/test/t/src/main/excel";
            fileName = fileName + "/article.xls";
            System.out.println(fileName);
            File file=new File(fileName);
            if (!file.exists()) {
                file.createNewFile();
            }
            wwb = Workbook.createWorkbook(file);
            WritableSheet ws = wwb.createSheet("article", 0);
            Label labelTitle= new Label(0, 0, "标题");
            Label labelContent= new Label(1, 0, "内容");
            Label labelType = new Label(2, 0, "类型");
            Label labelAuthorName= new Label(3, 0, "作者");
            Label labelAuthorId= new Label(4, 0, "作者账号");
            ws.addCell(labelTitle);
            ws.addCell(labelContent);
            ws.addCell(labelType);
            ws.addCell(labelAuthorId);
            ws.addCell(labelAuthorName);
            Label labelTitle_= new Label(0, 1, article.getTitle());
            Label labelContent_= new Label(1, 1, article.getContent());
            Label labelType_ = new Label(2, 1, article.getAtype());
            Label labelAuthorName_= new Label(3, 1, article.getAuthorName());
            Label labelAuthorId_= new Label(4, 1, article.getAuthorId()+"");
            ws.addCell(labelTitle_);
            ws.addCell(labelContent_);
            ws.addCell(labelType_);
            ws.addCell(labelAuthorId_);
            ws.addCell(labelAuthorName_);
            wwb.write();
            System.out.println("数据导出成功!");
            wwb.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        out.write(article.getTitle());
    }

}
