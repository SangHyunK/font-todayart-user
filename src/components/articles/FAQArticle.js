import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import queryString from 'query-string'
import { Actions } from '../../actions';
import Breadcrumb from '../common/breadcrumb'
import useCollapse from 'react-collapsed';

class FAQArticle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      boardId: queryString.parse(props.location.search).boardId
    }
    this.searchWordInput = React.createRef();
    this.searchConditionInput = React.createRef();
  }

  componentDidMount() {
    this.props.getArticleList(this.state.boardId);
  }

//  shouldComponentUpdate(nextProps, nextState) {
//    if(this.props.article.data.items)
//  }

  onDelete = (e, articleId) => {
    e.preventDefault();
    this.props.articleDelete(articleId)
      .then(response => {
        this.props.history.push("/articles?boardId=" + this.props.article.boardName.boardId)
      })
      .catch(error => {
        console.log('error>>', error);
      });
  };

  onModify = (e, boardId, articleId) => {

    e.preventDefault();

    this.props.getArticleDetail(boardId, articleId)
      .then(response => {
        this.props.history.push("/articleWrite/" + articleId)
      })
      .then(console.log('thisprops = ', this.props))
      .catch(error => {
        console.log('error>>', error);
      });
  };

  onSearch = (e) => {

    e.preventDefault();

    console.log('searchWordInputsearchWordInputsearchWordInput=', this.searchConditionInput)

    const searchWord = this.searchWordInput.current.value;
    const searchCondition = this.searchConditionInput.current.value;
    const boardId = this.props.article.boardName.boardId;

    console.log("searchCondition", searchCondition)
    this.props.articleSearch({ boardId, searchWord, searchCondition })
      .then(response => {
        this.props.history.push("/articles/search?value="+searchWord+"&boardId="+boardId+"&where="+searchCondition)
      })
      .catch(error => {
        console.log('error>>', error);
      });
  }


  render() {
    const { items } = this.props.article;
    const { userDetails } = this.props.auth;
    

    return (
      <div>
        
        {this.props.article.boardName !== null && this.props.article.boardName !== undefined ?
          <Breadcrumb title={this.props.article.boardName.boardName} /> : ''
        }
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline" onSubmit={e => this.onSearch(e)}>

            <select
              className="form-control"
              type="boardId"
              id="boardId"
              name="boardId"
              placeholder="카테고리"
              ref={this.searchConditionInput}
              required>
              <option value="TC">제목 + 내용</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>

            <input className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="SearchWordInput"
              name="searchWordInput"
              ref={this.searchWordInput} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        {items ?
          items.map((detail) => {
            const { title, content, nickname } = detail;
            return (
              <div>

                {/*Dashboard section*/}
                <section className="faq-section section-b-space">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="accordion theme-accordion" id="accordionExample">
                          <div className="card">
                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse"
                                  data-target={"#collapse"+`${detail.articleId}`} aria-expanded="true"
                                  aria-controls={"collapse"+`${detail.articleId}`}>
                                  {title}
                                  {this.props.article.boardName.boardId==2? "글쓴이:"+nickname :''}
                                </button>
                              </h5>
                            </div>

                            <div id={"collapse"+`${detail.articleId}`} className="collapse" aria-labelledby={"heading"+`${detail.articleId}`}
                              data-parent="#accordionExample">
                              <div className="card-body">
                                <p>{detail.content}</p>
                                <span>
                                  {((userDetails !== null) && (detail.memberId === userDetails.memberId)) || ((userDetails !== null) && (userDetails.memberId === 1)) ?
                                    <div className="checkout_btn_inner d-flex align-items-center"><nav className="navbar navbar-light bg-light">
                                      <form className="form-inline">
                                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onModify(e, detail.boardId, detail.articleId)}>수정</button>
                                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onDelete(e, detail.articleId)}>삭제</button>
                                      </form>
                                    </nav>
                                    </div> : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div >
            )
          }) : ''}

          
      </div>
    )

  }
}


const mapStateToProps = (state) => ({
  article: state.article,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId)),
  articleDelete: (boardId) => dispatch(Actions.articleDelete(boardId)),
  getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId)),
  articleSearch: ({ boardId, searchWord, searchCondition }) => dispatch(Actions.articleSearch({ boardId, searchWord, searchCondition }))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQArticle))