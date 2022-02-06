class ApplicationController < ActionController::API
    include ActionController::Cookies

    def current_employee
        Employee.find_by(id: session[:employee_id])
    end
end
