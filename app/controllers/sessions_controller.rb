class SessionsController < ApplicationController
  
  def create
    employee = Employee.find_by(name: params[:name])
    if employee&.authenticate(params[:password])
      session[:employee_id] = employee.id
      render json: employee, status: :ok
    else
      render json: "Username or password invalid", status: :unauthorized
    end
  end

  def destroy
    session.delete :employee_id
  end
end
