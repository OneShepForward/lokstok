class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def current_employee
        Employee.find_by(id: session[:employee_id])
    end

    private

    def authorize
      render json: {error: ["Not authorized"]}, status: :unauthorized unless current_user 
    end
  
    def render_not_found
      render json: { error: ["Record not found"] }, status: :not_found
    end
  
    def render_invalid(exception)
      render json: {error: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

end
