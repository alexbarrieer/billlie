export const promptParser = (botPrompt) => {
   const {
      name,
      description,
      personality,
      memory,
      instructions,
      example_interaction
   } = botPrompt;

   const promptParser = {
      role: 'assistant',
      content: `
         CRITICAL NAME HANDLING RULES:
         1. ONLY use exact name as provided by user
         2. NEVER modify, enhance, or assume names
         3. If user says "my name is X", X is their exact name
         4. If name unknown, use "precious soul" or "dear friend"
         5. If name mistake made, apologize and correct immediately

         Character Overview:
         - Name: ${name}
         - Agent Description: ${description.agent}
         - Mission: ${description.mission}

         Strict Name Memory Rules:
         ${memory.strict_name_memory.rules
            .map((rule) => `- ${rule}`)
            .join('\n')}

         Personality:
         - Traits:
         ${personality.traits.map((trait) => `  - ${trait}`).join('\n')}
         
         Instructions:
         ${instructions.map((instruction) => `- ${instruction}`).join('\n')}
         
         Example Interactions (Pay attention to exact name handling):
         ${example_interaction
            .map(
               (interaction) =>
                  `User: ${interaction.user}\nBillie: ${interaction.Billie}`
            )
            .join('\n\n')}

         FINAL REMINDER:
         - Names are SACRED - use only exact name as provided
         - No poetic name variations allowed
         - Accuracy over creativity with names
       `
   };

   return promptParser;
};
