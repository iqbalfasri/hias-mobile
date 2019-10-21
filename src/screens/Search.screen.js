import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// module component
import Collapsible from 'react-native-collapsible';

// own component
import Button from '../components/HiasButton';

// libs
import {UrlAPI} from '../lib';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      mainCategory: null,
      subCategory: null,
      outerCollapse: false,
      innerCollapse: true,
    };
  }

  // state data category
  // const [mainCategory, setMainCategory] = useState(null);
  // const [subCategory, setSubCategory] = useState(null);

  // // state collapsible
  // const [outerCollapse, setOuterCollapse] = useState(false);
  // const [innerCollapse, setInnerCollapse] = useState(true);

  // fetch data
  async componentDidMount() {
    try {
      const response = await fetch(UrlAPI('/product/mainCategory'));
      const responseJson = await response.json();

      const {data} = responseJson;

      let dataObj = [];

      // Re-structure data object
      if (data.length !== 0) {
        data.map(el => {
          dataObj.push({
            ...el,
            toggle: false,
          });
        });
      }

      this.setState({mainCategory: dataObj});
    } catch (error) {
      alert('Error ambil data main category');
    }
  }

  toggle(index, e) {
    let mainCat =
      this.state.mainCategory !== null ? [...this.state.mainCategory] : null;
    mainCat[index].toggle = !mainCat[index].toggle;

    // console.log(mainCat);
    this.setState({mainCategory: mainCat});
  }

  render() {
    return (
      <View style={styles.flexScreen}>
        <Text>Search Screen</Text>
        {this.state.mainCategory !== null
          ? this.state.mainCategory.map((cat, i) => {
              console.log(cat);
              return (
                <React.Fragment key={i}>
                  <Button onPress={this.toggle.bind(this, i)}>
                    <Text>{cat.mainCategoryName}</Text>
                  </Button>
                  <Collapsible collapsed={!cat.toggle}>
                    <Text>Text colapsible outer</Text>

                    <Button
                      onPress={() =>
                        this.setState({
                          innerCollapse: !this.state.innerCollapse,
                        })
                      }>
                      <Text>Inner</Text>
                    </Button>

                    <Collapsible collapsed={this.state.innerCollapse}>
                      <Text>Text colapsible inner</Text>
                    </Collapsible>
                  </Collapsible>
                </React.Fragment>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Search;
