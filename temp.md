 const message = data.message;
        const aiIsPresentInMessage = message.includes('@ai');
        
        socket.broadcast.to(socket.roomId).emit('project-message', data);
        
        if (aiIsPresentInMessage) {
            const prompt = message.replace('@ai', '');
            const result = await generateResult(prompt);
        
            io.to(socket.roomId).emit('project-message', {
                message: result,
                sender: {
                    _id: 'ai',
                    email: 'AI'
                }
            });
        
            return;
        }