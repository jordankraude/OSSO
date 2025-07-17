declare module 'blog' {
    export interface Blog {
      id: number;
      title: string;
      description?: string;
      coverPhoto: string;
      blogSections: BlogSection[]
      otherPhotos?: string[];
    }

    interface BlogSection {
        subheader: string;
        paragraph: string;
    }
  }
  
export default Blog