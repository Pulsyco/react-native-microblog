import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React ,{useState,useEffect} from 'react';
import { Divider } from 'react-native-elements';
import { POSTS } from '../../data/posts';
import { db,firebase } from '../../firebase';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: require('../../assets/shares.jpg'),
    likedImageUrl:   require('../../assets/love1.jpg'),
  },
  {
    name: 'Comment',
    imageUrl: require('../../assets/comment.jpg')
  },
  {
    name: 'Share',
    imageUrl: require('../../assets/love.jpg')
  },
];

const Post = ({ post }) => {
  const handleLike = post => {
    const currentLikeStatus = !post.like_by_user.includes(firebase.auth().currentUser.email)

    db.collection('users')
    .doc(post.owner_email)
    .collection('posts')
    .doc(post.id)
    .update({
      like_by_user: currentLikeStatus 
      ? firebase.firestore.FieldValue.arrayUnion
      (firebase.auth().currentUser.email)
      :  firebase.firestore.FieldValue.arrayRemove
      (firebase.auth().currentUser.email)
    }).then(()=>{
      console.log('Document successfully updated')
    })
    .catch(error=>{
      console.log('Error updating document :',error)
    })
  }
  return (
    <View style={{ marginBottom: 30,paddingTop:10 }}>
      <Divider style={{ backgroundColor: 'black', height: 1, }} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, margin: 10 }}>
        <PostFooter post ={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comment post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
      
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: post.profilePicture }} style={styles.story} />
      <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
    </View>
    <View>
      <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
    </View>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
    />
  </View>
);

const PostFooter = ({handleLike, post}) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.leftfooterIconsContainer}>
        <TouchableOpacity onPress={()=>handleLike(post)}>
        <Image style={styles.footerIcon} 
        source={ post.like_by_user.includes(firebase.auth().currentUser.email) 
        ? postFooterIcons[0].likedImageUrl 
        : postFooterIcons[0].imageUrl} />

        </TouchableOpacity>
         
         <Image style={styles.footerIcon} source={require('../../assets/comment.jpg')} />
         <Image style={styles.footerIcon} source={require('../../assets/love.jpg')} />
         
      
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image style={styles.footerIcon} source={require('../../assets/Bookmark.jpg')} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imageUrl }) => (
  <TouchableOpacity onPress={() => console.log('Icon pressed')}>
    <Image style={imgStyle} source={imageUrl} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ color: 'white', fontWeight: '600' }}>{post.like_by_user.length.toLocaleString('en')} likes</Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'white' }}>
      <Text style={{ fontWeight: '600', marginRight: 5 }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <TouchableOpacity>
      {!!post.comments.length && (
        <Text style={{ color: 'gray' }}>
          View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

const Comment = ({ post }) => (
  <View>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
          {' '}{comment.comment}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  leftfooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-around',
  },
});

export default Post;
