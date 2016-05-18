silent !tmux set status off
silent !tmux list-panes -F '\#F' | grep -q Z || tmux resize-pane -Z
set nocursorline
set textwidth=44
set noshowmode
set noshowcmd
set scrolloff=0
set formatoptions=crnwq1
Limelight 0.8
GitGutterDisable

nnoremap <Leader>4 :set colorcolumn=+1<CR>
nnoremap <leader>j zc zj zo z<CR>
nnoremap <silent> <leader><CR> :TComment<CR> :silent w<CR>
nnoremap <silent> <leader>o :TComment<CR>
nnoremap <silent> <leader>\ :TComment<CR> zc zj zo z<CR>

redraw!
