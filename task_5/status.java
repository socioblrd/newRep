public class test extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getOutputStream().println("<html><h1 style = 'color:red'>Application Is Running</h1></html>");
    }

}