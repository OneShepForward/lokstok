class EmployeesController < ApplicationController
  before_action :set_employee, only: %i[ update destroy ]

  # GET /employees
  def index
    @employees = Employee.all

    render json: @employees
  end

  # GET /employees/1
  def show
    if current_employee
      render json: current_employee, status: :ok
    else
      render json: "No user logged in", status: :unauthorized
    end
  end

  # POST /employees
  def create
    employee = Employee.create!(employee_params)
    session[:employee_id] = employee.id
    render json: employee, status: :ok
  end

  def create_admin
    admin = Employee.create!(admin_params)
    session[:employee_id] = admin.id
    render json: admin, status: :ok
  end

  # PATCH/PUT /employees/1
  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # DELETE /employees/1
  def destroy
    @employee.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def employee_params
      params.permit(:name, :position, :password, :password_confirmation)
    end

    def admin_params
      params.permit(:name, :position, :password, :password_confirmation, :admin)
    end
end
