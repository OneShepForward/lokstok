class ItemsController < ApplicationController
  before_action :set_item, only: %i[ show update destroy ]

  # GET /items
  def index
    @items = Item.all

    render json: @items
  end

  # GET /items/1
  def show
    render json: @item
  end

  # POST /items
  def create
    @item = Item.new(item_params)

    if @item.save
      render json: @item, status: :created, location: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /items/1
  def destroy
    @item.destroy
  end

  # the method used when an item is being pulled from the warehouse
  def create_item_job
    # create an instance in the join table
    item_job = ItemJob.create!(item_id: params["item_id"], job_id: params["job_id"])
    item = Item.find(params["item_id"])
    # remove item from active status, mark it as checked out, and assign to the logged in employee 
    item.update(employee_id: params["employee_id"], active: params["active"], bin: "out")
    render json: item_job, status: :created
  end

  def add_shipment
    quantity = params["quantity"]
    items = []
    quantity.times do 
      items << Item.create!(shipment_params)
    end
    render json: items, status: :created
  end

  def active_items
    items = Item.all.where(active: true)
    render json: items, status: :created
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def item_params
      params.require(:item).permit(:bin, :active, :part_id, :employee_id)
    end

    def shipment_params
      params.permit(:bin, :active, :part_id)
    end
end
