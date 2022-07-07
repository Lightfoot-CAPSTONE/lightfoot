package com.codeup.lightfoot.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller  //this annotation "@" tells spring to treat this as a controller class
public class ViewController {
    @RequestMapping({"/", "/about", "/login", "/home"})
    public String showView(){
        return "forward:/index.html";}
}
