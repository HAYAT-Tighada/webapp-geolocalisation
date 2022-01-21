package gestionSmartphone.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ma.dao.SmartPhoneLocal;
import ma.dao.UserLocal;
import ma.entities.SmartPhone;
import ma.entities.User;

@WebServlet("/SmartPhoneServlet")
public class SmartPhoneServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@EJB
    private SmartPhoneLocal metier;
	@EJB
	private UserLocal metier1;
    
	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	
    	if ("add".equals(request.getParameter("action"))) {
    		System.out.println(request.getParameter("user"));
    		metier.create(new SmartPhone(request.getParameter("imei"), metier1.findById(Integer.parseInt(request.getParameter("user")))));
            response.setContentType("application/json");
            List<SmartPhone> smartPhones = new ArrayList<>();
            for (SmartPhone p : metier.findAll()) {
            	smartPhones.add(new SmartPhone(p.getId(),p.getImei(), p.getUser()));
                
            }
            Gson json = new Gson();
            response.getWriter().write(json.toJson(smartPhones));
        } else if ("update".equals(request.getParameter("action"))) {
            System.out.println("voila la date " + request.getParameter("date"));
            metier.update(new SmartPhone(Integer.parseInt(request.getParameter("id")), request.getParameter("imei"),metier1.findById(Integer.parseInt( request.getParameter("user")))));
            response.setContentType("application/json");
            List<SmartPhone> users = new ArrayList<>();
            for (SmartPhone p : metier.findAll()) {
            	users.add(new SmartPhone(p.getId(), p.getImei(),p.getUser()));
                
            }
            
            Gson json = new Gson();
            response.getWriter().write(json.toJson(users));
        } else if ("delete".equals(request.getParameter("action"))) {
        	System.out.println(Integer.parseInt(request.getParameter("id")));
            metier.delteById(metier.findById(Integer.parseInt(request.getParameter("id"))));
            response.setContentType("application/json");
            List<SmartPhone> smartPhones = metier.findAll();
            Gson json = new Gson();
            response.getWriter().write(json.toJson(smartPhones));
        } else if ("edit".equals(request.getParameter("action"))) {
            response.setContentType("application/json");
            SmartPhone user = metier.findById(Integer.parseInt(request.getParameter("id")));
            Gson json = new GsonBuilder().setDateFormat(DateFormat.SHORT, DateFormat.SHORT).create();
            response.getWriter().write(json.toJson(user));
        } else if ("search".equals(request.getParameter("action"))) {
            
            response.setContentType("application/json");
            List<User> professeurs = new ArrayList<>();
//            for (User p : metier.findProfessorBySpc(serviceSpc.findById(Integer.parseInt(request.getParameter("id"))))) {
//                professeurs.add(new Professeur(p.getId(), p.getNom(), p.getPrenom(), p.getTele(), p.getEmail(), p.getDate(), p.getSexe(), p.findSpecialite()));
//                
//            }
            
            Gson json = new Gson();
            response.getWriter().write(json.toJson(professeurs));
        } else if ("searchdate".equals(request.getParameter("action"))) {
            
//            response.setContentType("application/json");
//            List<User> professeurs = new ArrayList<>();
//            for (Professeur p : serviceProfessor.findBetweenDate(new Date(request.getParameter("date1").replace("-", "/")), new Date(request.getParameter("date2").replace("-", "/")))) {
//                professeurs.add(new Professeur(p.getId(), p.getNom(), p.getPrenom(), p.getTele(), p.getEmail(), p.getDate(), p.getSexe(), p.findSpecialite()));
//                
//            }
//            for (Professeur p : professeurs) {
//                System.out.println(p.toString());
//            }
//            
//            Gson json = new Gson();
//            response.getWriter().write(json.toJson(professeurs));
        } else if ("listspc".equals(request.getParameter("action"))) {
//            response.setContentType("application/json");
//            //Map<String,Integer> dataTheChart = serviceProfessor.chartBySpc();
//            List<ChartDto> dataTheChart = serviceProfessor.chartBySpc();
//            /* Iterator listiterkey = dataTheChart.keySet().iterator();
//             List<String> keyhash = new LinkedList<>();
//             for(Map.Entry entrykeychart : dataTheChart.entrySet()){
//             keyhash.add((String) entrykeychart.getKey());
//             }*/
//            Gson json = new Gson();
//            response.getWriter().write(json.toJson(dataTheChart));
        } else {
        	response.setContentType("application/json");
            List<SmartPhone> smartPhones = new ArrayList<>();
            for (SmartPhone p : metier.findAll()) {
            	smartPhones.add(new SmartPhone(p.getId(),p.getImei(), p.getUser()));
                
            }
            Gson json = new Gson();
            response.getWriter().write(json.toJson(smartPhones));
            
        }   
    }
    

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		processRequest(request, response);
	}
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }


}
