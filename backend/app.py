from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from transformers import pipeline
import torch
import openai
from openai import OpenAI

# Load the feature extraction pipeline for BERT
embedding_model = pipeline("feature-extraction", model="bert-base-uncased")

def get_bert_embedding(text):
    """Generate BERT embedding for a given text using the feature-extraction pipeline."""
    embeddings = embedding_model(text)
    # Extract the embedding for the [CLS] token (first token)
    cls_embedding = embeddings[0][0]  # First token of the first sequence
    return cls_embedding

import numpy as np
def cosine_similarity(vec1, vec2):
    """Compute cosine similarity between two vectors."""
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


# Load embeddings.json
with open("embeddings.json", "r") as json_file:
    embeddings_data = json.load(json_file)

# Prepare embeddings and metadata
embeddings = []
metadata = []
for entry in embeddings_data:
    embeddings.append(torch.tensor(entry['embedding']))
    metadata.append(entry['song'])

# Function to find top 5 similar songs
def find_top_songs(input_text):
    # Generate embedding for the input text
    input_embedding = get_bert_embedding(input_text)
    
    # Compute cosine similarity with all embeddings in the dataset
    similarities = [cosine_similarity(input_embedding, emb) for emb in embeddings]
    
    # Find the indices of the top 5 most similar embeddings
    top_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:90]
    
    selected_songs=[]
    top_songs_sim=[]
    
    
    # Iterate over the sorted top indices and add the corresponding songs
    for i in top_indices:
      if(metadata[i] not in selected_songs):
        selected_songs.append(metadata[i])
        top_songs_sim.append([metadata[i],similarities[i]])
        # Stop once we have 3 unique songs
        if len(top_songs_sim) == 3:
            break
    
    return list(top_songs_sim)  # Return the top 3 unique songs as a list


def get_music_recommendation(user_input):
  XAI_API_KEY = ""

  client = OpenAI(
      api_key=XAI_API_KEY,
      base_url="https://api.x.ai/v1",
  )

  # Function to get a music description based on user input

  completion = client.chat.completions.create(
      model="grok-beta",
      messages=[
          {
              "role": "system",
              "content": (
                  "You are Grok, an AI expert in understanding emotions and preferences for music. "
                  "Your task is to analyse the if the user emotion and provide very short suggestion in a single line, in very simple english."
                  "If the user says they are feeling sad, the bot should recommend 'calming music'."
                  "If the user says they are feeling happy, the bot should recommend 'energetic music'."
                  "If the user says they are feeling angry, the bot should recommend 'calming music'."
                  "If the user says they are feeling anxious, the bot should recommend 'calming music'."
                  "If the user says they are feeling excited, the bot should recommend 'energetic music'."
                  "If the user says they are want to shift the mood, the bot should recommend 'mood shifting'."
                  "If the user says they want to concentrate or focus, the bot should recommend 'improve focus'."
              ),
          },
          {
              "role": "user",
              "content": (
                  f"This is the what the user feels like: {user_input}. "
                  "Based on this output what kind of music the user should listen to to feel better and provide very short suggestion in a single line, in very simple english."
              )
          },
      ],
  )
  return completion.choices[0].message.content




app = Flask(__name__)
CORS(app)

def process_text(text):

    print(get_music_recommendation(text))
    print(text)
    # print(len(get_music_recommendation(text)))  
    return find_top_songs(get_music_recommendation(text))

@app.route('/process-text', methods=['POST'])
def handle_text():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    results = process_text(text)
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)

## xai-3HkAWoHYXd1aQOdyJRBREmEKeslgGOxXmEq8A271d68luqCbXjZfxmdFS7aJdnFFxL24yF9IfQxS47Rh