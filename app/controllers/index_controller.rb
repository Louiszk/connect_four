class IndexController < ApplicationController
    
    @@grid = Array.new(7) { [] }
    @@turn = 1
    def move
        col = params[:value].to_i
        
        if @@grid[col].length < 6
            
            if @@turn==1
                @@grid[col] << 1
                @@turn = -1
            else 
                @@grid[col] << -1
                @@turn = 1
            end
            
            ActionCable.server.broadcast('game_channel', {col: col, grid: @@grid, turn: @@turn*-1 , action: "move"})
            render json: {"ok": "Success"}
            
        else
            
            render json: { "error" => 'Column is full' }, status: :unprocessable_entity
        end
    end

    def reset
        @@grid = Array.new(7) { [] }
        ActionCable.server.broadcast('game_channel', {action: "reset"})
        redirect_back fallback_location: root_path
    end

    def start
        @grid = @@grid
    end

end
