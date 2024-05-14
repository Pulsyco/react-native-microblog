import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import { POSTS } from '../../data/posts';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: require('../../assets/shares.jpg')
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
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider style={{ backgroundColor: 'black', height: 1 }} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, margin: 10 }}>
        <PostFooter />
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
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
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

const PostFooter = () => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.leftfooterIconsContainer}>
      {postFooterIcons.map((icon, index) => (
        <Icon key={index} imgStyle={styles.footerIcon} imageUrl={icon.imageUrl} />
      ))}
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
    <Text style={{ color: 'white', fontWeight: '600' }}>{post.likes.toLocaleString('en')} likes</Text>
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
      {!!post.coments.length && (
        <Text style={{ color: 'gray' }}>
          View {post.coments.length > 1 ? 'all' : ''} {post.coments.length} {post.coments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

const Comment = ({ post }) => (
  <View>
    {post.coments.map((comment, index) => (
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
