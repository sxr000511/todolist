import { emptyItemQuery } from "./item";
import Store from "./store";
import View from "./view";

export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {
    this.store = store;
    this.view = view;

    view.bindAddItem(this.addItem.bind(this));
    view.bindEditItemSave(this.editItemSave.bind(this));
    view.bindEditItemCancel(this.editItemCancel.bind(this));
    view.bindRemoveItem(this.removeItem.bind(this));
    view.bindToggleItem((id, completed) => {
      this.toggleCompleted(id, completed);
      this._filter();
    });
    view.bindRemoveCompleted(this.removeCompletedItems.bind(this));
    view.bindToggleAll(this.toggleAll.bind(this));
    // 路由由controller保存
    this._activeRoute = "";
    this._lastActiveRoute = null;
  }

  /**
   * Set and render the active route.
   *
   * @param {string} raw '' | '#/' | '#/active' | '#/completed'
   */
  setView(raw) {
    const route = raw.replace(/^#\//, "");
    // 改变路由
    this._activeRoute = route;
    // 重新render html
    this._filter();
    // 改变button 的class
    this.view.updateFilterButtons(route);
  }

  /**
   * Add an Item to the Store and display it in the list.
   *
   * @param {!string} title Title of the new item
   */
  //   从store里取出东西送到view方法里，_filter 是refresh函数
  addItem(title) {
    this.store.insert(
      {
        id: Date.now(),
        title,
        completed: false,
      },
      () => {
        this.view.clearNewTodo();
        this._filter(true);
      }
    );
  }

  /**
   * Save an Item in edit.
   *
   * @param {number} id ID of the Item in edit
   * @param {!string} title New title for the Item in edit
   */
  editItemSave(id, title) {
    if (title.length) {
      this.store.update({ id, title }, () => {
        this.view.editItemDone(id, title);
      });
    } else {
      // 如果为空删除
      this.removeItem(id);
    }
  }

  /**
   * Cancel the item editing mode.
   *
   * @param {!number} id ID of the Item in edit
   */
  editItemCancel(id) {
    this.store.find({ id }, (data) => {
      const title = data[0].title;
      this.view.editItemDone(id, title);
    });
  }

  /**
   * Remove the data and elements related to an Item.
   *
   * @param {!number} id Item ID of item to remove
   */
  removeItem(id) {
    this.store.remove({ id }, () => {
      this._filter();
      this.view.removeItem(id);
    });
  }

  /**
   * Remove all completed items.
   */
  removeCompletedItems() {
    this.store.remove({ completed: true }, this._filter.bind(this));
  }

  /**
   * Update an Item in storage based on the state of completed.
   *
   * @param {!number} id ID of the target Item
   * @param {!boolean} completed Desired completed state
   */
  toggleCompleted(id, completed) {
    this.store.update({ id, completed }, () => {
      this.view.setItemComplete(id, completed);
    });
  }

  /**
   * Set all items to complete or active.
   *
   * @param {boolean} completed Desired completed state
   */
  toggleAll(completed) {
    this.store.find({ completed: !completed }, (data) => {
      for (let { id } of data) {
        this.toggleCompleted(id, completed);
      }
    });

    this._filter();
  }

  /**
   * Refresh the list based on the current route.
   *
   * @param {boolean} [force] Force a re-paint of the list
   */
  _filter(force) {
    const route = this._activeRoute;

    if (
      force ||
      this._lastActiveRoute !== "" ||
      this._lastActiveRoute !== route
    ) {
      /* jscs:disable disallowQuotedKeysInObjects */
      //   find(query, callback)，
      // 根据第一个参数过滤出来的数据送到showitems里显示
      //   this.store === controller.store
      this.store.find(
        {
          "": emptyItemQuery,
          active: { completed: false },
          completed: { completed: true },
        }[route],
        this.view.showItems.bind(this.view)
      );
      /* jscs:enable disallowQuotedKeysInObjects */
    }

    this.store.count((total, active, completed) => {
      this.view.setItemsLeft(active);
      this.view.setClearCompletedButtonVisibility(completed);

      this.view.setCompleteAllCheckbox(completed === total);
      this.view.setMainVisibility(total);
    });

    this._lastActiveRoute = route;
  }
}
